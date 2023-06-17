export enum LINKS {
    DASHBOARD =  "/",
    TRANSACTIONS = "/transactions",
    INTEGRATION = "/integration",
    PROFILE = "/profile"
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