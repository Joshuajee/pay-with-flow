import { navs } from "@/libs/utils"
import Card from "../utils/Card"
import Link from "next/link"

const SideNav = () => {

    return (
        <Card>  

            <div className="flex flex-col">

                {
                    navs.map((nav, index) => {
                        return (
                            <div className="text-center text-lg py-4">
                                <Link key={index} href={nav.link}> {nav.name} </Link>
                            </div>
                        )
                    })
                }

            </div>

        </Card>
    )
}

export default SideNav