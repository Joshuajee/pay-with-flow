import { mutate, tx } from "@onflow/fcl"
import { LINKS } from "./constants"
import { SUPPORTED_TOKENS } from "./enums"

export const dollarFormat = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

export const tokenFormat = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
    }).format(amount)
}

export const navs = [
    { name : 'Dashboard', link: LINKS.DASHBOARD },
    // { name : 'Profile', link: LINKS.PROFILE },
    { name : 'Transactions', link: LINKS.TRANSACTIONS },
    { name : 'Integration', link: LINKS.INTEGRATION },
    { name : 'Faucets', link: LINKS.FAUCETS },
]


export const contract = process.env.NEXT_PUBLIC_CONTRACT_ACCT 
export const contractName = "FlowMerchant"

export const tokenLists = [
    { name : SUPPORTED_TOKENS.FLOW, value: SUPPORTED_TOKENS.FLOW },
    { name : SUPPORTED_TOKENS.TEUR, value: SUPPORTED_TOKENS.TEUR},
]


export const resolveTransaction = async (cadence: string, args: any, callback?: () => void, errCallback?: () => void) => {

    try {

        const limit = 500;

        const txId = await mutate({ cadence, args, limit });
      
        console.log("Waiting for transaction to be sealed...");
      
        const txDetails = await tx(txId).onceSealed();
      
        console.log({ txDetails });

        callback?.()

    } catch (e) {
        errCallback?.()
    }

}