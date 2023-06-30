import { useState } from "react"
import Link from "next/link" 
import ConnectionBtn from "../utils/ConnectionBtn"
import { useScroll } from "@/hooks/window"
import { useAuth } from "@/contexts/AuthContext"
import { RiCopperCoinLine } from 'react-icons/ri'
import { useRouter } from "next/router"


const Navbar = () => {

    const scrollPosition = useScroll()

    const trigger = scrollPosition > 80

    return (
        <header className={`${(trigger ) ? "bg-[#202128] shadow-lg" : "" }text-slate-100 fixed w-full body-font z-10 flex justify-center`}>
            <div className="container w-full flex flex-wrap justify-between item-center py-2 lg:py-3 px-2">
                <Link href={"/"} className="pt-2 md:pt-0 block title-font text-lg sm:text-2xl md:text-3xl font-bold">
                    Flow Merchant
                </Link>

                <div className="sm:hidden"><ConnectionBtn /></div>

                <div className="flex justify-evenly items-center">

                    <div className="hidden sm:block">
                        <ConnectionBtn />
                    </div>

                </div>
           
            </div>
            
        </header>
    )
}

export default Navbar