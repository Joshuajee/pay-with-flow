export enum LINKS {
    DASHBOARD =  "/account",
    TRANSACTIONS = "/account/transactions",
    INTEGRATION = "/account/integration",
}


export enum AUTH_ROUTES {
    LOGIN = "/auth/login",
    CREATE_ACCOUNT = "/auth/create-account",
    FORGOT = "/auth/forgot",
    RESET = "/auth/reset",
}

export enum ACCOUNT_ROUTES {
    DASHBOARD = "/account/",
    LOGOUT = "/account/logout",
}








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