import { withIronSessionSsr } from 'iron-session/next'
import Layout from '@/components/utils/Layout'
import AuthCard from '@/components/utils/AuthCard'
import '@/flow/config'
import { sessionCookie, validateUser } from '@/services/session'
import prisma from '@/libs/prisma'
import { Transaction } from '@prisma/client'
import { toast } from 'react-toastify'
import { PAYMENT_LINK } from '@/libs/constants'



export const getServerSideProps = withIronSessionSsr(async({req, params}) => {

  const { user, nonce } = await validateUser(req)

  const id = Number(params?.id)

  const transactions = await prisma.transaction.findUnique({where: {  id  }})

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

export default function Transaction(props: IProps) {

  const data: Transaction = JSON.parse(props.data)

  const cell = (cell: string, content: any) => {
    return (
      <>
        <div className='col-span-2'>{cell}</div>
        <div className='col-span-4'>{content ? content : "N/A"}</div>
      </>
    )
  }

  const copyLink = () => {
    navigator.clipboard.writeText(`${PAYMENT_LINK}/${data.address}/${data.tx_ref}`)
    toast.success("Text copied to clipboard")
  }

  return (
    <Layout nonce={props.nonce}>

      <AuthCard title='Transaction'>

        <div className='flex mt-4 h-[80%] justify-center items-center'>

          <div>

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
                className='bg-purple-700 rounded-md px-8 py-2'
                onClick={copyLink}>
                Copy Link
              </button>

            </div>

          </div>

        </div>

      </AuthCard>

    </Layout>
  )
}
