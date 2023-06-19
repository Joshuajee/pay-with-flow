import { ReactNode } from "react"
import { RiCopperCoinLine } from 'react-icons/ri'
import { dollarFormat } from "@/libs/utils";



interface IProps {

}

const TokenControl = () => {
    return (
        <div className="flex justify-between w-full p-2 px-3 border-[1px] rounded-md">
            <div>
                <p className="text-2xl font-bold">USDC</p>
                <div className="flex"> 
                    <RiCopperCoinLine size={24} color="gold" /> 
                    <p className="ml-2"> { 0} </p>
                </div>
            </div>

            <div>
                <input type="checkbox" />
                <p>{dollarFormat(100)}</p>
            </div>
        </div>
    )
}

export default TokenControl