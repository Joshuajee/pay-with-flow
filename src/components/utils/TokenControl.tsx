import { ReactNode } from "react"
import Card from "./Card";
import { dollarFormat } from "@/libs/utils";

interface IProps {

}

const TokenControl = () => {
    return (
        <div className="flex justify-between w-full p-2 px-3 border-[1px]">
            <div>
                <p className="text-2xl font-bold">USDC</p>
                <p>{dollarFormat(100)}</p>
            </div>

            <div>
                <input type="checkbox" />
                <p>{dollarFormat(100)}</p>
            </div>
        </div>
    )
}

export default TokenControl