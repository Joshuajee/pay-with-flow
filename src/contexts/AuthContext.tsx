import * as fcl from "@onflow/fcl";
import {  createContext,  ReactNode,  useCallback,  useContext, useEffect,  useState, } from "react";
import axios from 'axios'
import { API_ROUTES } from "@/libs/enums";
import { toast } from "react-toastify";
import getProfile from "@/flow/scripts/getProfile";

export const AuthContext = createContext<any>({});

export const useAuth = (): any => useContext(AuthContext);

interface IProps {
  children: ReactNode
}

export default function AuthProvider({ children } : IProps) {
  
  const [currentUser, setUser] = useState({ loggedIn: false, addr: undefined });
  const [userProfile, setProfile] = useState(null);
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    fcl.currentUser.subscribe(setUser)
  }, []);

  const loadProfile = useCallback(async () => {
    if (currentUser?.loggedIn) {
      try {
        const profile = await getProfile(currentUser?.addr)
        setProfile(profile ?? null);
        setProfileExists(profile !== null);
      } catch (e) {
        console.error(e)
      }
    }
  }, [currentUser.loggedIn, currentUser.addr, setProfile, setProfileExists]);

  useEffect(() => {
    // Upon login check if a userProfile exists
    if (currentUser.loggedIn && userProfile === null) {
      loadProfile();
    }
  }, [currentUser, userProfile, loadProfile]);

  const logOut = async () => {
    fcl.unauthenticate();
    setUser({ addr: undefined, loggedIn: false });
    setProfile(null);
    setProfileExists(false);
  };



  const logIn = async () => {
    const account = await fcl.authenticate();
  
    //const accountProofService = account.services.find((services: any) => services.type === 'account-proof' );

    // if (accountProofService) {
    //   try {
    //     await axios.post(
    //       API_ROUTES.VERIFY, 
    //       { data: JSON.stringify(accountProofService.data) }
    //     )
    //   } catch (e) {
    //     if (axios.isAxiosError(e)) {
    //       toast.error(e?.response?.data?.message)
    //     } else {
    //       toast.error("An error occurred")
    //       console.error(e);
    //     }
    //   }
    // }

    if (account?.addr) {
      try {
        await axios.post(
          API_ROUTES.VERIFY_TEST, 
          { data: JSON.stringify({address: account?.addr}) }
        )
      } catch (e) {
        if (axios.isAxiosError(e)) {
          toast.error(e?.response?.data?.message)
        } else {
          toast.error("An error occurred")
          console.error(e);
        }
      }
    }
  }

  const signUp = () => {
    fcl.signUp();
  };

  
  const value = {
    currentUser,
    userProfile,
    profileExists,
    isLoggedIn: currentUser.loggedIn,
    logOut,
    logIn,
    signUp,
    loadProfile,
    //createProfile,
    //updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
 