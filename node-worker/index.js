const { PrismaClient } = require('@prisma/client')
const fcl = require("@onflow/fcl")
const { postTransaction } = require('./post-webhook')
require("dotenv").config({ path: "./.env" })


const prisma = new PrismaClient();


fcl.config({
  "accessNode.api": process.env.NEXT_PUBLIC_ACCESS_NODE_API,
  "fcl.eventPollRate": 1000
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

fcl.events(event).subscribe(async(eventData) => {

  const { paymentId, tx_ref, tokenReceived, amount } = eventData
  
  //console.log({ paymentId, tx_ref, tokenReceived, amount });

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

    const transaction = await prisma.transaction.findFirst({ 
      where: { tx_ref }
    })

    if (transaction) {
      if (transaction.requestedToken === Number(tokenReceived)) {
        await prisma.transaction.update({
          where: {  tx_ref  },
          data: {
            amountPaid: { increment: amount },
            status: Number(Number(amount) + Number(transaction.amountPaid)) >= Number(transaction.amount) ? "paid" : "partial_payment",
            paidAt: date
          }
        })
      }

      await postTransaction(tx_ref, payment) 

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

});

