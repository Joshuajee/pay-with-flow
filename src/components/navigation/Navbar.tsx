import Link from "next/link" 
import ConnectionBtn from "../utils/ConnectionBtn"
import { useScroll } from "@/hooks/window"

const Navbar = () => {

    const scrollPosition = useScroll()

    const trigger = scrollPosition > 80

    return (
        <header className={`${(trigger ) ? "bg-[#202128] shadow-lg" : "" }text-slate-100 fixed w-full body-font z-10 flex justify-center`}>
            <div className="w-full flex flex-wrap justify-between item-center py-2 lg:py-3 px-2 lg:px-8">
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