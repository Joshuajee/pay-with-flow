import { mutate, tx } from "@onflow/fcl"
import { LINKS } from "./constants"
import { INCREMENT_ID, SUPPORTED_TOKENS } from "./enums"

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
    { name : 'Transactions', link: LINKS.TRANSACTIONS },
    { name : 'Integration', link: LINKS.INTEGRATION },
    { name : 'Faucets', link: LINKS.FAUCETS },
]


export const contract = process.env.NEXT_PUBLIC_CONTRACT_ACCT 
export const contractName = "FlowMerchant"

export const tokenLists = [
    { name : SUPPORTED_TOKENS.FLOW, value: 0 },
    { name : SUPPORTED_TOKENS.TUSD, value: 1 },
    { name : SUPPORTED_TOKENS.TEUR, value: 2 },
    { name : SUPPORTED_TOKENS.TGBP, value: 3 },
]


export const resolveTransaction = async (cadence: string, args: any, callback?: () => void, errCallback?: () => void) => {

    try {

        const limit = 5000;

        const txId = await mutate({ cadence, args, limit });
      
        console.log("Waiting for transaction to be sealed...");
      
        await tx(txId).onceSealed();

        callback?.()

    } catch (e) {
        console.log(e)
        errCallback?.()
    }

}


export const toTokenId = (token: SUPPORTED_TOKENS): number => {
    switch (token) {
        case SUPPORTED_TOKENS.FLOW:
            return 0
        case SUPPORTED_TOKENS.TUSD:
            return 1
        case SUPPORTED_TOKENS.TEUR:
            return 2
        case SUPPORTED_TOKENS.TGBP:
            return 3
        default:
            return -1
    }
}

export const fromTokenId = (id: number): SUPPORTED_TOKENS => {
    switch (id) {
        case 0:
            return SUPPORTED_TOKENS.FLOW
        case 1:
            return SUPPORTED_TOKENS.TUSD
        case 2:
            return SUPPORTED_TOKENS.TEUR
        case 3:
            return SUPPORTED_TOKENS.TGBP
        default:
            return SUPPORTED_TOKENS.FLOW
    }
}


export const getVault = (id: INCREMENT_ID): string => {
    switch (id) {
        case INCREMENT_ID.FLOW:
            return "/storage/flowTokenVault"
        case INCREMENT_ID.TUSD:
            return "/storage/tusdVault"
        case INCREMENT_ID.TEUR:
            return "/storage/teurVault"
        case INCREMENT_ID.TGBP:
            return "/storage/tgbpVault"
        default:
            return "/storage/"
    }
}

export const getReceiver = (id: INCREMENT_ID): string => {
    switch (id) {
        case INCREMENT_ID.FLOW:
            return "/public/flowTokenReceiver"
        case INCREMENT_ID.TUSD:
            return "/public/tusdReceiver"
        case INCREMENT_ID.TEUR:
            return "/public/teurReceiver"
        case INCREMENT_ID.TGBP:
            return "/public/tgbpReceiver"
        default:
            return "/public/"
    }
}


export const getPage = (page: number, take: number = 10) => {
    return { take, skip: (page - 1) * take }
}