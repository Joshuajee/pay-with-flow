import { ReactNode } from "react"

interface IProps {
    children: ReactNode;
}

const Card = ({ children } :IProps) => {
    return (
        <div className={`
            w-full h-full rounded-xl p-4 bg-gray-500/10 
            shadow-lg border-[1px] text-white
        `}>
            {children}
        </div>
    )
}

export default Card