import { withIronSessionSsr } from 'iron-session/next'
import Layout from '@/components/utils/Layout'
import AuthCard from '@/components/utils/AuthCard'
import '@/flow/config'
import { sessionCookie, validateUser } from '@/services/session'
import TransactionTable from '@/components/tables/TransactionTable'
import prisma from '@/libs/prisma'
import { Transaction } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'



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

  console.log(data)

  const cell = (cell: string, content: any) => {
    return (
        <>
            <div className='col-span-2'>
                {cell}
            </div>

            <div className='col-span-4'>
                {content ? content : "N/A"}
            </div>
        </>
    )
  }

  return (
    <Layout nonce={props.nonce}>
      <AuthCard title='Transaction'>
        <div className='flex mt-4 h-[80%] justify-center items-center'>

            <div className='border-[1px] p-4 rounded-md w-full max-w-[400px]'>

                <div className='grid grid-cols-6'>

                    {cell("Tx Ref", data.tx_ref)}

                    {cell("Status", data.status)}

                    {cell("Amount", data.amount)}

                    {cell("Amount Paid", data.amountPaid)}

                    {cell("Receiptient", data.addressTo)}

                    {cell("Source", data.source)}



                    {cell("Payer", data.addressFrom)}
        
                    {cell("Tx Hash", data.tx_hash)}

                    {cell("Narration", data.narration)}

                </div>

            </div>



        </div>
      </AuthCard>
    </Layout>
  )
}
