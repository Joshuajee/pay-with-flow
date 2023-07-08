import { CONTRACT_ADDRESS, FLOW_TOKEN_ADDRESS } from "./constants";

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



export enum INCREMENT_ID {
    FLOW = `A.${FLOW_TOKEN_ADDRESS}.FlowToken` as any,
    TEUR = `A.${CONTRACT_ADDRESS}.TEUR` as any,
    TUSD = `A.${CONTRACT_ADDRESS}.TUSD` as any,
    TGBP = `A.${CONTRACT_ADDRESS}.TGBP` as any,
}