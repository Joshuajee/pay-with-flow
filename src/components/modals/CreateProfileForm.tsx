import { useAuth } from "@/contexts/AuthContext"
//import createProfile from "@/flow/transactions/accountSetUp"
import { useState } from "react"
import { toast } from "react-toastify"
import ModalWrapper from "./ModalWrapper"
import Input from "../utils/Input"
import LoadingButton from "../utils/LoadingButton"
import useInput from "@/hooks/useInput"


interface IProps {
    open: boolean
    handleClose: () => void
}

const CreateProfileForm = ({open, handleClose} : IProps) => {

    const name = useInput("text", 3)

    const [loading, setLoading] = useState(false)

    const { loadProfile } = useAuth()

    const create = async() => {

        setLoading(true)
    
        try {
            //await createProfile(name, loadProfile)
            toast.success("Profile Created Successfully")
            handleClose()
        } catch (e) {
            console.error(e)
            toast.error("Error creating profile")
        }

        setLoading(false)
    }

    const disabled = name.error

    return (
        <ModalWrapper title={"Create Payment Link"} open={open} handleClose={handleClose}>
        
            <div className="flex flex-col justify-center">

                <div className="mb-4">
                    <Input type="number" label="Merchant Name" value={name.value} onChange={name.setValue}/>
                </div>

                <LoadingButton disabled={disabled} loading={loading} onClick={create}>
                    Create Link
                </LoadingButton>

            </div>

        </ModalWrapper>
    )
}

export default CreateProfileForm
 