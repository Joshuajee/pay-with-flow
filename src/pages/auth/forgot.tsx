import AuthLayout from "@/components/auth/AuthLayout";
import Input from "@/components/auth/Input";
import LoadingButton from "@/components/utils/LoadingButton";
import useInput from "@/hooks/useInput";
import { AUTH_APIS, AUTH_ROUTES } from "@/libs/enums";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


const Forgot = () => {

    const email = useInput("email")

    const [loading, setLoading] = useState(false)


    const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {

        setLoading(true)

        e.preventDefault()

        try {

            const body = {  email: email.value  }

            const res = await axios.post(AUTH_APIS.FORGOT, body)

            toast.success(res.data.message)

        } catch (e) {

            if (axios.isAxiosError(e)) {
                toast.error(e?.response?.data?.message)
            } else {
                console.error(e);
            }

        }

        setLoading(false)

    }

    return (
        <AuthLayout>

            <div className="flex flex-col items-center w-full">

                <form className="w-full max-w-sm" onSubmit={onSubmit}>
                    <Input 
                        id="email" name="password"
                        label="Email" type="email" 
                        placeholder="Enter your email address"
                        helperText=""  error={email.errorWarning}
                        value={email.value}  onChange={email.setValue}
                        onFocus={email.setOnFocus}
                        />

                    <LoadingButton loading={loading}> Send Reset Link </LoadingButton>

                </form>

                <p className="flex mt-2">
                    Don&apos;t have an Account? 
                    <Link className="ml-1 text-blue-600" href={AUTH_ROUTES.CREATE_ACCOUNT}> Create Account </Link> 
                </p>

            </div>


        </AuthLayout>
    );
}

export default Forgot;