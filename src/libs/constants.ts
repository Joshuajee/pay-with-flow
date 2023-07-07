export enum LINKS {
    DASHBOARD =  "/",
    TRANSACTIONS = "/transactions",
    INTEGRATION = "/integration",
    PROFILE = "/profile",
    FAUCETS = "/faucets"
}


export enum ACCOUNT_ROUTES {
    DASHBOARD = "/account/",
    LOGOUT = "/account/logout",
}


export const FLOW_TOKEN_ADDRESS = String(process.env.NEXT_PUBLIC_FLOW)?.slice(2)
export const CONTRACT_ADDRESS = String(process.env.NEXT_PUBLIC_CONTRACT_ACCT)?.slice(2)






// APIs
export enum AUTH_APIS {
    LOGIN = "/api/auth/login",
    SIGN_UP = "/api/auth/create",
    FORGOT = "/api/auth/forgot",
    RESET = "/api/auth/reset",
}

export const PROJECT_NAME = "Flow Merchant" 
export const RESET_TIME = 3600000
export const DOMAIN = String(process.env.DOMAIN)

export const PAYMENT_LINK = `${process.env.NEXT_PUBLIC_HOST}/pay`