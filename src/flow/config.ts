import { PROJECT_NAME } from "@/libs/constants";
import { LOCAL_STORAGE } from "@/libs/enums";
import { config } from "@onflow/fcl";

const resolver = async () => {
  return {
    appIdentifier: PROJECT_NAME,
    nonce: localStorage.getItem(LOCAL_STORAGE.NONCE)
  }
}

config({
  "app.detail.title": "Flow Next.js Quick Start",
  "app.detail.icon": "https://unavatar.io/twitter/muttonia",
  "accessNode.api": process.env.NEXT_PUBLIC_ACCESS_NODE_API,
  "discovery.wallet": process.env.NEXT_PUBLIC_DISCOVERY_WALLET,
  "fcl.eventPollRate": 3000,
  "0xFlowMerchant": process.env.NEXT_PUBLIC_CONTRACT_ACCT,
  "fcl.accountProof.resolver": resolver
})