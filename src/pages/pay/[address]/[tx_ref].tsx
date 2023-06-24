import { withIronSessionSsr } from 'iron-session/next'
import '@/flow/config'
import Layout from '@/components/utils/Layout'
import AuthCard from '@/components/utils/AuthCard'
import { sessionCookie, validateUser } from '@/services/session'
import TokenControl from '@/components/utils/TokenControl'
import LoadingButton from '@/components/utils/LoadingButton'
import LoadingButtonSM from '@/components/utils/LoadingButtonSM'
import { useState } from 'react'
import CreatePaymentForm from '@/components/modals/CreatePaymentForm'
import prisma from '@/libs/prisma'
import { NextPageContext } from 'next'
import Card from '@/components/utils/Card'
import { Transaction } from '@prisma/client'
import sendFlow from '@/flow/transactions/sendFlow'


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


  return (
    <Layout hideSidebar={true} nonce={props.nonce}>

      <Card>

        <div className='flex mt-4 h-[80%] justify-center items-center'>

          <div className=''>

            <div className='border-[1px] p-4 rounded-md w-full max-w-[600px]'>

              <div className='grid grid-cols-6'>

                {cell("Tx Ref", data.tx_ref)}

                {cell("Status", data.status)}

                {cell("Amount", data.amount)}

                {cell("Amount Paid", data.amountPaid)}

                {cell("Receiptient", data.address)}

                {cell("Source", data.source)}

                {cell("Narration", data.narration)}

              </div>

            </div>

            <div className='flex justify-center p-4'>

              <button
                onClick={() => sendFlow(data.address, data.tx_ref as string, Number(data.amount))}
                className='bg-purple-700 rounded-md px-8 py-2'
                >
                Send Flow
              </button>

            </div>

          </div>

        </div>

      </Card>

      <CreatePaymentForm open={open} handleClose={handleClose} />

    </Layout>
  )
}
