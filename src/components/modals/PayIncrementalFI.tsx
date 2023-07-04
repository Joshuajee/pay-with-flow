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
    token: number | undefined | null
    handleClose: () => void
}

const PayIncrementalFI = ({open, token, handleClose } : IProps) => {

    const name = useInput("text", 3)

    const [loading, setLoading] = useState(false)

    const success = async() => {
        toast.success("Profile created successfully")
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

                <LoadingButton color="green" loading={loading} onClick={create}>
                    Pay with
                </LoadingButton>

            </div>

        </ModalWrapper>
    )
}

export default PayIncrementalFI
 