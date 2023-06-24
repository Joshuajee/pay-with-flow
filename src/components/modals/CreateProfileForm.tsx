import { useAuth } from "@/contexts/AuthContext"
//import createProfile from "@/flow/transactions/accountSetUp"
import { useState } from "react"
import { toast } from "react-toastify"
import ModalWrapper from "./ModalWrapper"
import Input from "../utils/Input"
import LoadingButton from "../utils/LoadingButton"
import useInput from "@/hooks/useInput"
import createProfile from "@/flow/transactions/createProfile"


interface IProps {
    open: boolean
    handleClose: () => void
    loadProfile: () => void
}

const CreateProfileForm = ({open, handleClose, loadProfile} : IProps) => {

    const name = useInput("text", 3)

    const [loading, setLoading] = useState(false)

    const success = async() => {
        toast.success("Profile created successfully")
        loadProfile()
        handleClose()
        name.setValue("")
    }

    const error = () => {
        toast.error("Error creating profile")
    }

    const create = async() => {

        setLoading(true)
    
        try {
            await createProfile(name.value as string, success)
        } catch (e) {
            console.error(e)
            error()
        }

        setLoading(false)
    }

    const disabled = name.error

    return (
        <ModalWrapper title={"Create Profile"} open={open} handleClose={handleClose}>
        
            <div className="flex flex-col justify-center">

                <div className="mb-4">
                    <Input type="text" label="Merchant Name" value={name.value} onChange={name.setValue}/>
                </div>

                <LoadingButton disabled={disabled} loading={loading} onClick={create}>
                    Create Profile
                </LoadingButton>

            </div>

        </ModalWrapper>
    )
}

export default CreateProfileForm
 