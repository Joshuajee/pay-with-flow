export interface IAUTH {
    currentUser: any, 
    profileExists: boolean;
    userProfile: any,
    logOut: () => void;
    logIn:  () => void; 
    signUp: () => void;   
}

