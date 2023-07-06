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
import { fromTokenId } from '@/libs/utils'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import PayIncrementalFI from '@/components/modals/PayIncrementalFI'


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

  const amount = Number(data.amount).toFixed(4)

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
    toast.error("Transfer Failed")
  }
  

  const pay = () => {

    if(!data.address) return

    switch (data?.requestedToken) {
      case 0:
        return (
          <button
            onClick={() => sendFlow(data.address as string, data.tx_ref as string, Number(amount), success, error)}
            className='bg-green-700 hover:bg-green-500 rounded-md px-8 py-2'>
            Pay with Flow 
          </button>
        )
      case 1:
        return (
          <button
            onClick={() => sendTUSD(data.address as string, data.tx_ref as string, Number(amount), success, error)}
            className='bg-green-700 hover:bg-green-500 rounded-md px-8 py-2'>
            Pay with TUSD
          </button>
        )
      case 2:
        return (
          <button
            onClick={() => sendTEUR(data.address as string, data.tx_ref as string, Number(amount), success, error)}
            className='bg-green-700  hover:bg-green-500 rounded-md px-8 py-2'>
            Pay with TEUR
          </button>
        )
      case 3:
        return (
          <button
            onClick={() => sendTGBP(data.address as string, data.tx_ref as string, Number(amount), success, error)}
            className='bg-green-700 hover:bg-green-500 rounded-md px-8 py-2'>
            Pay with TGBP
          </button>
        )

    }

  }

  return (
    <Layout hideSidebar={true} nonce={props.nonce}>

      <Card>

        <div className='flex mt-4 h-[80%] justify-center items-center'>

          { data &&

            <div className=''>

              <div className='border-[1px] p-4 rounded-md w-full max-w-[600px]'>

                <div className='grid grid-cols-6 gap-4'>

                  {cell("Tx Ref", data.tx_ref)}

                  {cell("Status", data.status)}

                  {cell("Amount",  `${amount} ${fromTokenId(Number(data.requestedToken))}`)}

                  {data?.status !== "pending" && cell("Amount Paid", `${data.amountPaid} ${fromTokenId(Number(data.requestedToken))}`)}

                  {cell("Receiptient", data.address)}

                  {cell("Source", data.source)}

                  {cell("Narration", data.narration)}

                </div>

              </div>

              {
                data.status !== "paid" &&  
                  <div className='flex justify-center p-4 gap-3'> 
                    {pay()} 
                    <button
                      onClick={() => setOpen(true)}
                      className='bg-gray-700 hover:bg-gray-500 rounded-md px-8 py-2'>
                      Pay with another Token
                    </button>
                  </div>
              }

            </div>

          }

        </div>

      </Card>

      <PayIncrementalFI open={open} handleClose={handleClose} token={data?.requestedToken} />

    </Layout>
  )
}
