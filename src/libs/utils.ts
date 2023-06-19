import { LINKS } from "./constants"

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
    { name : 'Profile', link: LINKS.PROFILE },
    { name : 'Transactions', link: LINKS.TRANSACTIONS },
    { name : 'Integration', link: LINKS.INTEGRATION },
]


export const contract = process.env.NEXT_PUBLIC_CONTRACT_ACCT 
export const contractName = "FlowMerchant"

export const tokenLists = [
    { name : 'USDC', value: "LINKS.DASHBOARD" },
    { name : 'FLOW', value: "LINKS.PROFILE "},
]