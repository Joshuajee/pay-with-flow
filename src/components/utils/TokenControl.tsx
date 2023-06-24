import { ReactNode, useContext } from "react"
import { RiCopperCoinLine } from 'react-icons/ri'
import { dollarFormat } from "@/libs/utils";
import { SUPPORTED_TOKENS } from "@/libs/enums";
import { AuthContext } from "@/contexts/AuthContext";



interface IProps {
    token: SUPPORTED_TOKENS;
}

const TokenControl = ({token}: IProps) => {

    const { userProfile } = useContext(AuthContext)

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
                <p>{dollarFormat(100)}</p>
            </div>
        </div>
    )
}

export default TokenControl