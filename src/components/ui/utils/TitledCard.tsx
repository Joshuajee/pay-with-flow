import { ReactNode } from "react"
import Card from "./Card";

interface IProps {
    children: ReactNode;
    title: string;
}

const TitledCard = ({ children, title } :IProps) => {
    return (
        <Card>
            <h2 className="text-xl font-semibold">{title}</h2>
        </Card>
    )
}

export default TitledCard