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
import axios, { AxiosResponse } from "axios";
import Alert from "../utils/Alert";
import { PAYMENT_LINK } from "@/libs/constants";


interface IProps {
    open: boolean;
    handleClose: () => void;
}

const CreatePaymentForm = ({open, handleClose} : IProps) => {

    const [link, setLink] = useState<string | null>(null)

    const [selectedToken, setSelectedToken] = useState(tokenLists[0].value)
    
    const amount = useInput("number")
    
    const narration = useInput("text", 0)

    const [loading, setLoading] = useState(false)

    const disabled = amount.error || narration.error

    const create = async () => {
        
        setLoading(true)

        try {
            
            const body = { 
                token: selectedToken, 
                amount: amount.value, 
                narration: narration.value 
            }
            
            const res : AxiosResponse = await axios.post("/api/request-pay", body)
            
            const data  = res?.data

            const { addressTo, tx_ref } = data?.data

            setLink(`${PAYMENT_LINK}/${addressTo}/${tx_ref}`)

            toast.success(data.message)

            amount.setValue("")
            
            narration.setValue("")

        } catch (e) {
            if (axios.isAxiosError(e)) {
                toast.error(e?.response?.data?.message)
            } else {
                console.error(e);
            }
        }

        setLoading(false)
        
    }

    const copyLink = () => {
        navigator.clipboard.writeText(link as string)
        toast.success("Text copied to clipboard")
    }

    return (
        <ModalWrapper title={"Create Payment Link"} open={open} handleClose={handleClose}>

            <div className="flex flex-col justify-center">

                { link &&
                    <div className="mb-4">
                        <Alert type="success">
                            <p>Copy the link and share with your customer </p>
                            <p onClick={copyLink} className="cursor-pointer">{link}</p>
                        </Alert>
                    </div>
                }

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
 