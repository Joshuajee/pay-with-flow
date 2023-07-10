import { navs } from "@/libs/utils"
import Card from "../utils/Card"
import Link from "next/link"
import { useRouter } from "next/router"

const SideNav = () => {

    const { asPath } = useRouter()

    return (
        <Card>  

            <div className="flex flex-col">

                {
                    navs.map((nav, index) => {
                        return (
                            <Link key={index} href={nav.link}>
                                <div className={`w-full text-center text-lg py-4 hover:bg-gray-600 ${(asPath === nav.link) && "bg-gray-700 "}`}>
                                    {nav.name}
                                </div>
                            </Link>
                        )
                    })
                }

            </div>

        </Card>
    )
}

export default SideNav