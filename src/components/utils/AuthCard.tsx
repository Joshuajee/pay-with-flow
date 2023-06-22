import { ReactNode, useContext, useState } from "react"
import Card from "./Card";
import { AuthContext } from "@/contexts/AuthContext";
import ConnectionBtn from "./ConnectionBtn";
import LoadingButton from "./LoadingButton";
import CreateProfileForm from "../modals/CreateProfileForm";

interface IProps {
    children: ReactNode;
    title: string;
}

const AuthCard = ({ children, title } :IProps) => {

    const { isLoggedIn, profileExists, loadProfile } = useContext(AuthContext)

    const [open, setOpen] = useState(false)

    const handleClose = () => {
      setOpen(false)
    }
  

    const createProfile = (
        <div className="w-44">
            <LoadingButton onClick={() => setOpen(true)}> Create Profile  </LoadingButton>
        </div>
    )

    return (
        <Card>
            <h2 className="text-xl font-semibold">{title}</h2>

            {
                (!profileExists || !isLoggedIn) && (
                    <div className="flex justify-center items-center h-[90%]">
                        {
                            !isLoggedIn ?   <ConnectionBtn />   :   createProfile
                        }
                    </div>
                ) 
            }

            { 
                (profileExists && isLoggedIn) && children 
            }

            <CreateProfileForm open={open} handleClose={handleClose} loadProfile={loadProfile} />

        </Card>
    )
}

export default AuthCard