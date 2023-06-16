import { ReactNode } from "react"

interface IProps {
    children: ReactNode;
}

const Container = ({ children } :IProps) => {
    return (
        <div className={`w-full flex justify-center h-[calc(100vh_-_80px)]`}>
            <div className="w-full flex flex-wrap justify-between item-center p-2 lg:p-8">
                {children}
            </div>
        </div>
    )
}

export default Container