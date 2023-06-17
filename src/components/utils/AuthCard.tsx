import { ReactNode, useContext } from "react"
import Card from "./Card";
import { AuthContext } from "@/contexts/AuthContext";

interface IProps {
    children: ReactNode;
    title: string;
}

const AuthCard = ({ children, title } :IProps) => {

    const { currentUser, profileExists } = useContext(AuthContext)

    console.log({ currentUser, profileExists } )

    return (
        <Card>
            <h2 className="text-xl font-semibold">{title}</h2>

            {
                !profileExists || !currentUser && (
                    <div>

                    </div>
                ) 
            }

            { 
                (profileExists && currentUser)  && children 
            }
            
        </Card>
    )
}

export default AuthCard