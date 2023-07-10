import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import LoadingButton from "../utils/LoadingButton"
import { INCREMENT_ID, SUPPORTED_TOKENS } from "@/libs/enums"
import getPriceOutput from "@/flow/scripts/incrementFi/getPriceOutput"
import swapExactToken, { ISwapDetails } from "@/flow/transactions/incrementFi/swapExactToken"
import { useRouter } from "next/router"
import getFlowBalance from "@/flow/scripts/getFlowBalance"
import getTUSDBalance from "@/flow/scripts/getTUSDBalance"
import getTEURBalance from "@/flow/scripts/getTEURBalance"
import getTGBPBalance from "@/flow/scripts/getTGBPBalance "


interface IProps {
    token: SUPPORTED_TOKENS;
    amount: number;
    requestedToken: number;
    address: string;
    tx_ref: string;
    redirect: string | null;
    handClose(): void;
}

const IncrementPayBtn = ({ token, requestedToken, amount, address, tx_ref, redirect, handClose } : IProps) => {

    const [loading, setLoading] = useState(false)

    const [amountToPay, setAmountToPay] = useState(0)

    const [maxAmountToPay, setMaxAmountToPay] = useState(0)

    const [balance, setBalance] = useState(null)

    const [from, setFrom] = useState(INCREMENT_ID.FLOW)
    const [to, setTo] = useState(INCREMENT_ID.TUSD)

    const router = useRouter() 


    const getPrice = useCallback(async() => {

        let from = INCREMENT_ID.FLOW
        let to =  INCREMENT_ID.TUSD   

        switch(Number(requestedToken)) {
            case 0:
                to = INCREMENT_ID.FLOW
                break
            case 1:
                to = INCREMENT_ID.TUSD
                break
            case 2:
                to = INCREMENT_ID.TEUR
                break
            case 3:
                to = INCREMENT_ID.TGBP
                break
            default:
                console.warn("Token Not Found")
        }
    
        switch(token) {
            case SUPPORTED_TOKENS.FLOW:
                from = INCREMENT_ID.FLOW
                setBalance(await getFlowBalance(address))
                break
            case SUPPORTED_TOKENS.TUSD:
                from = INCREMENT_ID.TUSD
                setBalance(await getTUSDBalance(address))
                break
            case SUPPORTED_TOKENS.TEUR:
                from = INCREMENT_ID.TEUR
                setBalance(await getTEURBalance(address))
                break
            case SUPPORTED_TOKENS.TGBP:
                from = INCREMENT_ID.TGBP
                setBalance(await getTGBPBalance(address))
                break
            default:
                console.warn("Token Not Found")
        }

        setTo(to)
        setFrom(from)


        console.log({amount, from, to})

        try {
            const price = (await getPriceOutput(amount, to, from))[1]
            setAmountToPay(price)
            setMaxAmountToPay(Number(price) * 1.05)
        } catch (e) {

        }
    
    }, [])

    const success = async() => {
        toast.success("Transfer was Successfull")
        router.push("/pay/success?redirect="+ redirect)
        handClose()
    }

    const error = () => {
        toast.error("Transfer Failed")
    }

    const pay = async() => {
        setLoading(true)
        const details: ISwapDetails = {
            amountInMax: maxAmountToPay,
            exactAmountOut: amount,
            path: [from, to],
            to: address,
            deadline: (Date.now() / 1000) + 3600,
            tx_ref: tx_ref
        }
        await swapExactToken(details, success, error)
        setLoading(false)
    }

    useEffect(() => {
        getPrice()
    }, [])

    return (
        <div>
            <div className="font-medium">
                <p className="text-center">Current Price: {amountToPay} {token}  </p>
                <p className="text-center">Max Price: {maxAmountToPay} {token}  </p>
                <p className="text-center">Balance: {balance} {token}  </p>
            </div>
            <LoadingButton color="green" loading={loading} onClick={pay}>
                Pay with {token} 
            </LoadingButton>
        </div>
    )
}

export default IncrementPayBtn
 