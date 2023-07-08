import { withIronSessionSsr } from 'iron-session/next'
import '@/flow/config'
import Layout from '@/components/utils/Layout'
import { sessionCookie, validateUser } from '@/services/session'
import { useState } from 'react'
import CreatePaymentForm from '@/components/modals/CreatePaymentForm'
import prisma from '@/libs/prisma'
import Card from '@/components/utils/Card'
import { Transaction } from '@prisma/client'
import { fromTokenId, toTokenId } from '@/libs/utils'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'


interface IProps {
    user: string;
    nonce: string;
    data: string;
}


export default function Home() {

    const router = useRouter()

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const cell = (cell: string, content: any) => {
        return (
        <>
            <div className='col-span-2'>{cell}</div>
            <div className='col-span-4'>{content ? content : "N/A"}</div>
        </>
        )
    }

    const success = () => {
        toast.success("Transfer Successful")
        setTimeout(() => {
        router.reload()
        }, 3000)
    }

    const error = () => {
        toast.success("Transfer Failed")
    }
    

    const pay = () => {

    }

    return (
        <div className='flex h-screen justify-center items-center'>
            
            <div className='w-full max-w-lg'>

                <Card>

                </Card>
            </div>

        </div>
    )
}
