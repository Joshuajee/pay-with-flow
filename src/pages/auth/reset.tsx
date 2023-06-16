import AuthLayout from "@/components/auth/AuthLayout";
import Input from "@/components/auth/Input";
import LoadingButton from "@/components/utils/LoadingButton";
import useInput from "@/hooks/useInput";
import React, { useEffect, useState } from "react";


const Reset = () => {

    const password = useInput('password')
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const isPassword = password.value === passwordConfirm

    const isDisabled =  password.error || !isPassword


    useEffect(() => {

    }, [])

    return (
        <AuthLayout>
            <form className="w-full max-w-sm">

                <Input 
                    id="password" name="password"
                    label="Password" type="password" 
                    placeholder="Enter your password"  
                    helperText={password.errorMessage}  error={password.errorWarning}
                    value={password}  onChange={password.setValue}
                    onFocus={password.setOnFocus}
                    />

                <Input 
                    id="password_conf" name="password_conf"
                    label="Password Confirm" type="password" 
                    placeholder="Enter your password"  
                    helperText="Should be same as password" error={!isPassword}
                    value={passwordConfirm}  onChange={setPasswordConfirm}
                    />

                <LoadingButton disabled={isDisabled}> Reset </LoadingButton>

            </form>
        </AuthLayout>
    );
}

export default Reset;