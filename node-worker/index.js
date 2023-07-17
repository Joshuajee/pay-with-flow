const { PrismaClient } = require('@prisma/client')
const fcl = require("@onflow/fcl")
require("dotenv").config({ path: "./.env" })
const { postTransaction } = require('./post-webhook')
const { sendNotification } = require('./post-email')


const prisma = new PrismaClient();

const initialBlockHeight = 111029830

fcl.config({
  "accessNode.api": process.env.NEXT_PUBLIC_ACCESS_NODE_API,
  "fcl.eventPollRate": 5000
})
 
const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ACCT).substring(2);
const contractName = "FlowMerchant";
const eventName = "Deposit";

// Event name consist of 2 or 4 parts
// 2 part event name have only system events
// For deployed contract, event should be constructed from 4 parts
// - "A" prefix, stands for "account"
// - address where contract, holding definition of event is deployed
// - contract name
// - event name
const event = `A.${contractAddress}.${contractName}.${eventName}`;

console.log("Worker has started monitoring events...", process.env.NEXT_PUBLIC_ACCESS_NODE_API)

console.log(
  `Listening for event "${eventName}" from "${contractName}" deployed on account 0x${contractAddress}`
);

const eventWorker = async(eventData) => {

  const values = eventData?.payload?.value?.fields

  const paymentId = values?.[0]?.value?.value
  const tx_ref = values?.[1]?.value?.value
  const tokenReceived = values?.[2]?.value?.value
  const amount = values?.[3]?.value?.value
    
  console.log("Payment Received: ", amount, "tx_ref: ", tx_ref, " Payment Id: ", paymentId, " Token: ", tokenReceived)
  
  const date = new Date()

  try {

    const payment = await prisma.payment.create({
      data: {
        paymentId: Number(paymentId),
        amount: Number(amount),
        tx_ref,
        requestedToken: Number(tokenReceived)
      }
    })

    let transaction = await prisma.transaction.findFirst({ 
      where: { tx_ref }
    })

    if (transaction) {
      if (transaction.requestedToken === Number(tokenReceived)) {
        transaction = await prisma.transaction.update({
          where: {  tx_ref  },
          data: {
            amountPaid: { increment: amount },
            status: Number(Number(amount) + Number(transaction.amountPaid)) >= Number(transaction.amount) ? "paid" : "partial_payment",
            paidAt: date
          }
        })
      }

      const user = await prisma.user.findUnique({
        where: {
          address: transaction?.address
        }
      })
    
      if (transaction.source == "api" && user.webhookUrl) await postTransaction(user, transaction, payment)
      
      if(user?.email) await sendNotification({...transaction, ...payment}, user?.email)

    } else {
      await prisma.transaction.create({
        data: {
          tx_ref,
          amount,
          amountPaid: amount,
          source: "unknown",
          paidAt: date,
          requestedToken: Number(tokenReceived)
        }
      })
    }

  } catch (e) {
    console.error(e)
  } finally {

  }

}



const flowEvent = async() => {

  try {

    let start = initialBlockHeight

    const lastRecordedBlock = await prisma.block.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 1,
      select: {
        height: true
      }
    })


    if (lastRecordedBlock?.[0]) {
      start = lastRecordedBlock?.[0]?.height 
    }

    const lastestBlock = await fcl.send(
      [fcl.getBlock(true)]
    ).then(fcl.decode);

    let end = lastestBlock.height

    console.log("Last Recorded Block: ", start, " Current Block: ", end)
     
    if ((end - start) > 200) {
      end = start + 200
    }

    const response = await fcl.send(
      [fcl.getEventsAtBlockHeightRange(event, start, end)]
    )

    const events = response.events

    for await (const event of events) {
      eventWorker(event)
    }
     
    await prisma.block.create({
      data: {
        height: end
      }
    })

  } catch (e) {
    console.error(e)
  }    

}
     
setInterval(flowEvent, 20000);


