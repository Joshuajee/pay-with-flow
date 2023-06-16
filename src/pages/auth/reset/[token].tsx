import AuthLayout from "@/components/auth/AuthLayout";
import Input from "@/components/auth/Input";
import LoadingButton from "@/components/utils/LoadingButton";
import useInput from "@/hooks/useInput";
import { AUTH_APIS, AUTH_ROUTES } from "@/libs/enums";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";


const Reset = () => {

    const password = useInput('password')
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const isPassword = password.value === passwordConfirm

    const isDisabled =  password.error || !isPassword

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {

        setLoading(true)

        e.preventDefault()

        try {

            const body = {
                password: password.value,
                token: router.query.token
            }

            const res = await axios.post(AUTH_APIS.RESET, body)

            toast.success(res.data.message)

            setTimeout(() => {
                router.push(AUTH_ROUTES.LOGIN)
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
            <form className="w-full max-w-sm" onSubmit={onSubmit}>

                <Input 
                    id="password" name="password"
                    label="Password" type="password" 
                    placeholder="Enter your password"  
                    helperText={password.errorMessage}  error={password.errorWarning}
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

                <LoadingButton disabled={isDisabled} loading={loading}> Reset </LoadingButton>

            </form>
        </AuthLayout>
    );
}

export default Reset;