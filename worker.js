const next = require('next')
const { PrismaClient } = require('@prisma/client')
const fcl = require("@onflow/fcl");
//require("dotenv").config({ path: "./.env.development" })


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

fcl.events(event).subscribe(async(eventData, ...args) => {

  console.log(args)


  const { tx_ref, tokenReceived, amount } = eventData
  
  console.log({ tx_ref, tokenReceived, amount });

  const date = new Date()

  try {

    const transaction = await prisma.transaction.findUnique({ 
      where: { tx_ref }, 
      select: { 
        amount: true
      } 
    })

    if (transaction) {
      await prisma.transaction.update({
        where: {  tx_ref  },
        data: {
          amountPaid: { increment: amount },
          status:  "paid",
          paidAt: date
        }
      })
    } else {
      await prisma.transaction.create({
        data: {
          tx_ref,
          amount,
          amountPaid: amount,
          source: "unknown",
          paidAt: date
        }
      })
    }

  } catch (e) {
    console.error(e)
  } finally {

  }

});

