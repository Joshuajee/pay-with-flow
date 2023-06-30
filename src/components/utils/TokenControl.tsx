import { useContext, useState } from "react"
import { RiCopperCoinLine } from 'react-icons/ri'
import { SUPPORTED_TOKENS } from "@/libs/enums";
import { AuthContext } from "@/contexts/AuthContext";
import LoadingButton from "./LoadingButton";
import LoadingButtonSM from "./LoadingButtonSM";
import ModalWrapper from "./ModalWrapper";
import Input from "./Input";
import useInput from "@/hooks/useInput";
import withdrawFlow from "@/flow/transactions/withdrawFlow";
import { toast } from "react-toastify";
import withdrawTUSD from "@/flow/transactions/withdrawTUSD";
import withdrawTEUR from "@/flow/transactions/withdrawTEUR";
import withdrawTGBP from "@/flow/transactions/withdrawTGBP";



interface IProps {
    token: SUPPORTED_TOKENS;
}

const TokenControl = ({token}: IProps) => {

    const amount = useInput("number")
        
    const { userProfile, loadProfile } = useContext(AuthContext)

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    let balance = 0

    switch (token) {
        case SUPPORTED_TOKENS.FLOW:
            balance = userProfile?.FlowTokenVault?.balance
            break
        case SUPPORTED_TOKENS.TUSD:
            balance = userProfile?.TUSDVault?.balance
            break
        case SUPPORTED_TOKENS.TEUR:
            balance = userProfile?.TEURVault?.balance
            break
        case SUPPORTED_TOKENS.TGBP:
            balance = userProfile?.TGBPVault?.balance
            break
        default:
            balance = 0
    }

    const withdrawal = async () => {

        const success = () => {
            loadProfile()
            toast.success("Withdrawal was successful")
            handleClose()
        }

        const error = () => {
            toast.error("Withdrawal not successful")
        }

        switch (token) {
            case SUPPORTED_TOKENS.FLOW:
                await withdrawFlow(Number(amount.value), success, error)
                break
            case SUPPORTED_TOKENS.TUSD:
                await withdrawTUSD(Number(amount.value), success, error)
                break
            case SUPPORTED_TOKENS.TEUR:
                await withdrawTEUR(Number(amount.value), success, error)
                break
            case SUPPORTED_TOKENS.TGBP:
                await withdrawTGBP(Number(amount.value), success, error)
                break
            default:
                balance = 0
        }

    }
    
    return (
        <div className="flex justify-between w-full p-2 px-3 border-[1px] rounded-md">
            <div>
                <p className="text-2xl font-bold">{token}</p>
                <div className="flex"> 
                    <RiCopperCoinLine size={24} color="gold" /> 
                    <p className="ml-2"> {balance} </p>
                </div>
            </div>

            <div>
                <LoadingButtonSM onClick={() => setOpen(true)} color="green">
                    Withdraw
                </LoadingButtonSM>
            </div>

            <ModalWrapper title={"Withdraw " + token} open={open} handleClose={handleClose}>

                <Input type="number" value={amount.value} onChange={amount.setValue} />

                <LoadingButton onClick={withdrawal}>Withdraw</LoadingButton>

            </ModalWrapper>
        
        </div>
    )
}

export default TokenControl