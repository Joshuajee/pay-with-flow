import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import { toast } from "react-toastify"
import ModalWrapper from "./ModalWrapper"
import Input from "../utils/Input";
import useInput from "@/hooks/useInput";
import LoadingButton from "../utils/LoadingButton";
import Textarea from "../utils/Textarea";
import Select from "../utils/Select";
import { tokenFormat, tokenLists } from "@/libs/utils";


interface IProps {
    open: boolean;
    handleClose: () => void;
}

const CreatePaymentForm = ({open, handleClose} : IProps) => {


    const [selectedToken, setSelectedToken] = useState(tokenLists[0].value)
    const amount = useInput("number")
    const narration = useInput("text", 0)

    const [loading, setLoading] = useState(false)

    const disabled = amount.error || narration.error

    const create = async () => {
        
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

    return (
        <ModalWrapper title={"Create Payment Link"} open={open} handleClose={handleClose}>

            <div className="flex flex-col justify-center">

                <div className="mb-4">
                    <Select id="token" name="token" lists={tokenLists} onChange={setSelectedToken} />
                </div>

                <div className="mb-4">
                    <Input type="number" label="Amount" value={amount.value} onChange={amount.setValue}/>
                </div>

                <Textarea id="narration" name="narration" label="Narration" value={narration.value} onChange={narration.setValue} />

                <LoadingButton disabled={disabled} loading={loading} onClick={create}>
                    Create Link
                </LoadingButton>

            </div>

        </ModalWrapper>
    )
}

export default CreatePaymentForm
 