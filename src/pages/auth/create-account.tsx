import React, { useState } from "react";
import axios from 'axios';
import AuthLayout from "@/components/auth/AuthLayout";
import Input from "@/components/auth/Input";
import LoadingButton from "@/components/utils/LoadingButton";
import { AUTH_APIS, AUTH_ROUTES, ACCOUNT_ROUTES } from "@/libs/enums";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useInput from "@/hooks/useInput";


const CreateAccount = () => {

    const email = useInput('email')
    const password = useInput('password')
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const isPassword = password.value === passwordConfirm

    const isDisabled =  email.error || password.error || !isPassword

    const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {

        setLoading(true)

        e.preventDefault()

        try {

            const body = {
                email: email.value,
                password: password.value,
            }

            const res = await axios.post(AUTH_APIS.SIGN_UP, body)

            toast.success(res.data.message)

            setTimeout(() => {
                router.push(ACCOUNT_ROUTES.DASHBOARD)
            }, 1000)

        } catch (e) {

            if (axios.isAxiosError(e)) {
                console.log(e.status)
                console.error(e.response);
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
                        helperText={email.errorMessage}  error={email.error}
                        value={email.value}  onChange={email.setValue}
                        onFocus={email.setOnFocus}
                        />

                    <Input 
                        id="password" name="password"
                        label="Password" type="password" 
                        placeholder="Enter your password"  
                        helperText={password.errorMessage}  error={password.error}
                        value={password.value}  onChange={password.setValue}
                        onFocus={password.setOnFocus}
                        />
                    
                    <Input 
                        id="password_conf" name="password_conf"
                        label="Password Confirm" type="password" 
                        placeholder="Enter your password"  
                        helperText="Should be same as password" error={!isPassword}
                        value={passwordConfirm}  onChange={setPasswordConfirm}
                        />

                    <LoadingButton disabled={isDisabled} loading={loading}> Sign Up </LoadingButton>

                </form>

                <p className="flex mt-2">
                    Already have an Account? 
                    <Link className="ml-1 text-blue-600" href={AUTH_ROUTES.LOGIN}> Login </Link> 
                </p>

            </div>

        </AuthLayout>
    );
}

export default CreateAccount;