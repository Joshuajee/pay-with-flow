import { withIronSessionSsr } from 'iron-session/next'
import '@/flow/config'
import Layout from '@/components/utils/Layout'
import { sessionCookie, validateUser } from '@/services/session'
import { useState } from 'react'
import CreatePaymentForm from '@/components/modals/CreatePaymentForm'
import prisma from '@/libs/prisma'
import Card from '@/components/utils/Card'
import { Transaction } from '@prisma/client'
import sendFlow from '@/flow/transactions/sendFlow'
import sendTEUR from '@/flow/transactions/sendTEUR'
import sendTUSD from '@/flow/transactions/sendTUSD'
import sendTGBP from '@/flow/transactions/sendTGBP'
import { fromTokenId, toTokenId } from '@/libs/utils'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'


export const getServerSideProps = withIronSessionSsr(async({req, params}) => {

    const { user, nonce } = await validateUser(req)

    const { address, tx_ref } = params as any

    const transactions = await prisma.transaction.findFirst({
        where: {  
        address: address,
        tx_ref  
        }
    })

    return { 
        props: {
            user: JSON.stringify(user),
            nonce: JSON.stringify(nonce),
            data: JSON.stringify(transactions)
        }, 
    }
  
}, sessionCookie())

interface IProps {
    user: string;
    nonce: string;
    data: string;
}


export default function Home(props: IProps) {

    const router = useRouter()

    const data: Transaction = JSON.parse(props.data)

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
        <Layout hideSidebar={true} nonce={props.nonce}>

        <Card>

            <div className='flex mt-4 h-[80%] justify-center items-center'>

            <div className=''>

                <div className='border-[1px] p-4 rounded-md w-full max-w-[600px]'>

                <div className='grid grid-cols-6 gap-4'>

                    {cell("Tx Ref", data.tx_ref)}

                    {cell("Status", data.status)}

                    {cell("Amount",  `${data.amount} ${fromTokenId(Number(data.requestedToken))}`)}

                    {cell("Amount Paid", `${data.amountPaid} ${fromTokenId(Number(data.requestedToken))}`)}

                    {cell("Receiptient", data.address)}

                    {cell("Source", data.source)}

                    {cell("Narration", data.narration)}

                </div>

                </div>

                {
                data.status !== "paid" &&  
                    <div className='flex justify-center p-4'> 
                 
                    </div>
                }

            </div>

            </div>

        </Card>

        <CreatePaymentForm open={open} handleClose={handleClose} />

        </Layout>
    )
}
