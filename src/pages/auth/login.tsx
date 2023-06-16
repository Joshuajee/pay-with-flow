import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import AuthLayout from "@/components/auth/AuthLayout";
import Input from "@/components/auth/Input";
import LoadingButton from "@/components/utils/LoadingButton";
import { AUTH_APIS, AUTH_ROUTES, ACCOUNT_ROUTES } from "@/libs/enums";
import useInput from "@/hooks/useInput";


const Login = () => {

    const email = useInput("email")
    const password = useInput("password")

    const [loading, setLoading] = useState(false)

    const isDisabled = password.error || email.error 

    const router = useRouter()

    const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {

        setLoading(true)

        e.preventDefault()

        try {

            const body = {
                email: email.value, 
                password: password.value
            }

            const res = await axios.post(AUTH_APIS.LOGIN, body)

            toast.success(res.data.message)

            setTimeout(() => {
                router.push(ACCOUNT_ROUTES.DASHBOARD)
            }, 1000)

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

                <form onSubmit={onSubmit} className="w-full max-w-sm">

                    <Input 
                        id="email" name="email"
                        label="Email" type="email" 
                        placeholder="Enter your email address"
                        helperText={email.errorMessage}  error={email.errorWarning}
                        value={email.value}  onChange={email.setValue}
                        onFocus={email.setOnFocus}
                        />

                    <Input 
                        id="password" name="password"
                        label="Password" type="password" 
                        placeholder="Enter your password"  
                        helperText={password.errorMessage}  error={password.errorWarning}
                        value={password.value}  onChange={password.setValue}
                        onFocus={password.setOnFocus}
                        />

                    <LoadingButton disabled={isDisabled} loading={loading}> Login </LoadingButton>

                </form>

                <p className="flex mt-2">
                    Don&apos;t have an Account? 
                    <Link className="ml-1 text-blue-600" href={AUTH_ROUTES.CREATE_ACCOUNT}> Create Account </Link> 
                </p>

                <p className="flex mt-2">
                    <Link className="ml-1 text-blue-600" href={AUTH_ROUTES.FORGOT}> Forgot Password </Link> 
                </p>

            </div>

        </AuthLayout>
    );
}

export default Login;