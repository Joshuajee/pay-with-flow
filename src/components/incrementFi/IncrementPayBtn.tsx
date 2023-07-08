import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import LoadingButton from "../utils/LoadingButton"
import { INCREMENT_ID, SUPPORTED_TOKENS } from "@/libs/enums"
import getPriceOutput from "@/flow/scripts/incrementFi/getPriceOutput"
import swapExactToken, { ISwapDetails } from "@/flow/transactions/incrementFi/swapExactToken"
import { useRouter } from "next/router"


interface IProps {
    token: SUPPORTED_TOKENS;
    amount: number;
    requestedToken: number;
    address: string;
    tx_ref: string;
    handClose(): void;
}

const IncrementPayBtn = ({ token, requestedToken, amount, address, tx_ref, handClose } : IProps) => {

    const [loading, setLoading] = useState(false)

    const [amountToPay, setAmountToPay] = useState(0)

    const [maxAmountToPay, setMaxAmountToPay] = useState(0)

    const router = useRouter()

    const getPrice = useCallback(async() => {

        let from = INCREMENT_ID.FLOW
        let to =  INCREMENT_ID.TUSD    
    
        switch(requestedToken) {
            case 0:
                from = INCREMENT_ID.FLOW
                break
            case 1:
                from = INCREMENT_ID.TUSD
                break
            case 2:
                from = INCREMENT_ID.TEUR
                break
            case 3:
                from = INCREMENT_ID.TGBP
                break
            default:
                console.warn("Token Not Found")
        }
    
        switch(token) {
            case SUPPORTED_TOKENS.FLOW:
                to = INCREMENT_ID.FLOW
                break
            case SUPPORTED_TOKENS.TUSD:
                to = INCREMENT_ID.TUSD
                break
            case SUPPORTED_TOKENS.TEUR:
                to = INCREMENT_ID.TEUR
                break
            case SUPPORTED_TOKENS.TGBP:
                to = INCREMENT_ID.TGBP
                break
            default:
                console.warn("Token Not Found")
        }

        try {
            const price = (await getPriceOutput(amount, from, to))?.[1]
            setAmountToPay(price)
            setMaxAmountToPay(Number(price) * 1.05)
        } catch (e) {

        }
    
    }, [])

    const success = async() => {
        toast.success("Transfer was Successfull")
        router.push("/pay/success")
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
            path: [INCREMENT_ID.TEUR, INCREMENT_ID.TUSD],
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
            </div>
            <LoadingButton color="green" loading={loading} onClick={pay}>
                Pay with {token} 
            </LoadingButton>
        </div>
    )
}

export default IncrementPayBtn
 