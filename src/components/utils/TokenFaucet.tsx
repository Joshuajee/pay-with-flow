import { useCallback, useContext, useEffect, useState } from "react"
import { RiCopperCoinLine } from 'react-icons/ri'
import { SUPPORTED_TOKENS } from "@/libs/enums";
import { AuthContext } from "@/contexts/AuthContext";
import LoadingButtonSM from "./LoadingButtonSM";
import { toast } from "react-toastify";
import mintTEUR from "@/flow/transactions/mintTEUR";
import getTEURBalance from "@/flow/scripts/getTEURBalance";
import getFlowBalance from "@/flow/scripts/getFlowBalance";
import getTUSDBalance from "@/flow/scripts/getTUSDBalance";
import getTGBPBalance from "@/flow/scripts/getTGBPBalance ";
import mintTUSD from "@/flow/transactions/mintTUSD";
import mintTGBP from "@/flow/transactions/mintTGBP";



interface IProps {
    token: SUPPORTED_TOKENS;
}

const TokenFaucet = ({token}: IProps) => {

    const [balance, setBalance] = useState(null)

    const [loading, setLoading] = useState(false)
        
    const { currentUser } = useContext(AuthContext)

    const getBalance = useCallback(async() => {

        const address = currentUser.addr

        if (!address) return

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

    }, [currentUser?.addr])


    const mint = async () => {

        setLoading(true)

        const success = () => {
            getBalance()
            toast.success("You have received 10k " + token)
        }

        const error = () => {
            toast.error("Mint was not successful")
        }

        switch (token) {
            case SUPPORTED_TOKENS.FLOW:
                window.open("https://testnet-faucet.onflow.org/fund-account", '_blank', 'noopener,noreferrer');
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

        setLoading(false)

    }

    useEffect(() => {
        getBalance()
    }, [getBalance])


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
                <LoadingButtonSM loading={loading} onClick={mint}>
                    {
                        token === SUPPORTED_TOKENS.FLOW ? "Goto Faucet" : "Mint 10k"
                    }
                </LoadingButtonSM>
            </div>

        </div>
    )
}

export default TokenFaucet