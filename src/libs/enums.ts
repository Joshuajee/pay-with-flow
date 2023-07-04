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
export enum API_ROUTES {
    VERIFY = "/api/verify",
    VERIFY_TEST = "/api/verify-test",
}

export enum LOCAL_STORAGE {
    NONCE = "nonce"
}

export enum SUPPORTED_TOKENS {
    FLOW = "Flow Token",
    TEUR = "Test EUR",
    TUSD = "Test USD",
    TGBP = "Test GBP",
}