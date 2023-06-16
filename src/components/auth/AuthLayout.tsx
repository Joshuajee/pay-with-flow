import { PROJECT_NAME } from "@/libs/constants";
import React, { ReactNode } from "react";

interface IProps {
    children: ReactNode
}

const AuthLayout = (props: IProps) => {
    return (
        <main>
            <div className="flex justify-center h-screen">

                <div className="px-4 grid grid-cols-1 md:grid-cols-1 justify-center items-center h-full w-full gap-4">

                    <div className="flex flex-col items-center justify-center h-full w-full" >
                        <h1 className="text-5xl font-bold mb-10">{PROJECT_NAME}</h1>
                        {props.children}
                    </div>

                    {/* <div className="hidden md:flex items-center justify-center h-full w-full bg-white" >
                        {props.children}
                    </div> */}
                   

                </div>

            </div>

        </main>
    );
}

export default AuthLayout;