import { useAuth } from "@/contexts/AuthContext"
//import createProfile from "@/flow/transactions/accountSetUp"
import { useCallback, useState } from "react"
import { toast } from "react-toastify"
import ModalWrapper from "../modals/ModalWrapper"
import Input from "../utils/Input"
import LoadingButton from "../utils/LoadingButton"
import useInput from "@/hooks/useInput"
import createProfile from "@/flow/transactions/createProfile"
import { SUPPORTED_TOKENS } from "@/libs/enums"
import { fromTokenId } from "@/libs/utils"
import IncrementPayBtn from "./IncrementPayBtn"


interface IProps {
    open: boolean;
    token: number | undefined | null;
    amount: number;
    tx_ref: string;
    address: string;
    handleClose: () => void
}

const IncrementFIModal = ({open, token, amount, tx_ref, address, handleClose } : IProps) => {

    const requestedToken = Number(token)

    const [loading, setLoading] = useState(false)

    const [flowAmount, setFlowAmount] = useState(null)
    const [tusdAmount, setTUSDAmount] = useState(null)

    const getPrice = useCallback(async() => {
        
    }, [])

    const success = async() => {
        toast.success("Profile created successfully")
        handleClose()
    }

    const error = () => {
        toast.error("Error creating profile")
    }

    const create = async() => {


    }

    const disabled = false

    return (
        <ModalWrapper title={"Pay With another currency"} open={open} handleClose={handleClose}>
        
            <div className="flex flex-col justify-center">

                <h3 className="text-center text-xl font-bold py-3">
                    Amount: {amount} {fromTokenId(token as number)}
                </h3>

                {   (token != 0) && <IncrementPayBtn tx_ref={tx_ref} address={address} amount={amount} requestedToken={requestedToken} token={fromTokenId(0)}   handClose={handleClose} />   }

                {   (token != 1) && <IncrementPayBtn tx_ref={tx_ref} address={address} amount={amount} requestedToken={requestedToken} token={fromTokenId(1)}   handClose={handleClose} />   }

                {   (token != 2) && <IncrementPayBtn tx_ref={tx_ref} address={address} amount={amount} requestedToken={requestedToken} token={fromTokenId(2)}   handClose={handleClose} />   }

                {   (token != 3) && <IncrementPayBtn tx_ref={tx_ref} address={address} amount={amount} requestedToken={requestedToken} token={fromTokenId(3)}   handClose={handleClose} />   }


                <div className="text-end pt-6">

                    Powered by Increment Finance

                </div>

            </div>

        </ModalWrapper>
    )
}

export default IncrementFIModal
 