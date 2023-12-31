import { PROJECT_NAME } from "@/libs/constants";
import { LOCAL_STORAGE } from "@/libs/enums";
import { config } from "@onflow/fcl";
import logo from "@/img/logo.png"

const resolver = async () => {
  return {
    appIdentifier: PROJECT_NAME,
    nonce: localStorage.getItem(LOCAL_STORAGE.NONCE)
  }
}

config({
  "app.detail.icon": logo, 
  "app.detail.title": "Flow Merchant",
  "accessNode.api": process.env.NEXT_PUBLIC_ACCESS_NODE_API,
  "discovery.wallet": process.env.NEXT_PUBLIC_DISCOVERY_WALLET,
  "fcl.eventPollRate": 5000,
  // "fcl.accountProof.resolver": resolver,
  "network": "testnet",
  "0xFlowMerchant": process.env.NEXT_PUBLIC_CONTRACT_ACCT,
  "0xFT": process.env.NEXT_PUBLIC_FUNGIBLE_TOKEN,
  "0xFLOW": process.env.NEXT_PUBLIC_FLOW,
  "0xIncrementFi": "0x2f8af5ed05bbde0d"
})
