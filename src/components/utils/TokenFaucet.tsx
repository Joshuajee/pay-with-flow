import { ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { RiCopperCoinLine } from 'react-icons/ri'
import { dollarFormat } from "@/libs/utils";
import { SUPPORTED_TOKENS } from "@/libs/enums";
import { AuthContext } from "@/contexts/AuthContext";
import LoadingButton from "./LoadingButton";
import LoadingButtonSM from "./LoadingButtonSM";
import ModalWrapper from "./ModalWrapper";
import Input from "./Input";
import useInput from "@/hooks/useInput";
import withdrawFlow from "@/flow/transactions/withdrawFlow";
import { toast } from "react-toastify";
import mintUSD from "@/flow/transactions/mintTUSD";
import mintTEUR from "@/flow/transactions/mintTEUR";
import getTEURBalance from "@/flow/scripts/getTEURBalance";
import getFlowBalance from "@/flow/scripts/getFlowBalance";
import getTUSDBalance from "@/flow/scripts/getTUSDBalance";
import getTGBPBalance from "@/flow/scripts/getTGBPBalance ";
import mintTUSD from "@/flow/transactions/mintTUSD";
import mintTGBP from "@/flow/transactions/mintTEUR";



interface IProps {
    token: SUPPORTED_TOKENS;
}

const TokenFaucet = ({token}: IProps) => {

    const amount = useInput("number")

    const [balance, setBalance] = useState(null)
        
    const { userProfile, loadProfile, currentUser } = useContext(AuthContext)

    const address = currentUser.addr


    const getBalance = useCallback(async() => {

        switch (token) {
            case SUPPORTED_TOKENS.FLOW:
                setBalance((await getFlowBalance(address)) || 0)
                break
            case SUPPORTED_TOKENS.TUSD:
                setBalance((await getTUSDBalance(address)) || 0)
                break
            case SUPPORTED_TOKENS.TEUR:
                setBalance((await getTEURBalance(address)) || 0)
                break
            case SUPPORTED_TOKENS.TGBP:
                setBalance((await getTGBPBalance(address)) || 0)
                break
            default:
                setBalance(null)
        }

    }, [])


    const mint = async () => {

        const success = () => {
            getBalance()
            toast.success("You have received 10k " + token)
        }

        const error = () => {
            toast.error("Mint was not successful")
        }

        switch (token) {
            case SUPPORTED_TOKENS.FLOW:
        
                break
            case SUPPORTED_TOKENS.TUSD:
                await mintTUSD(success, error)
                break
            case SUPPORTED_TOKENS.TEUR:
                await mintTEUR(success, error)
                break
            case SUPPORTED_TOKENS.TGBP:
                await mintTGBP(success, error)
                break
            default:
                console.warn("Invalid Token")
        }

    }

    useEffect(() => {
        getBalance()
    }, [])


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
                <LoadingButtonSM onClick={mint}>
                    Mint 10k
                </LoadingButtonSM>
            </div>

        </div>
    )
}

export default TokenFaucet