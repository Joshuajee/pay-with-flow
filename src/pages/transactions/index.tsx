import { withIronSessionSsr } from 'iron-session/next'
import Layout from '@/components/utils/Layout'
import AuthCard from '@/components/utils/AuthCard'
import '@/flow/config'
import { sessionCookie, validateUser } from '@/services/session'
import TransactionTable from '@/components/tables/TransactionTable'
import prisma from '@/libs/prisma'
import { getPage } from '@/libs/utils'



export const getServerSideProps = withIronSessionSsr(async({req, query}) => {

  const { user, nonce } = await validateUser(req)

  const { page } = query

  const currentPage = Number(page || 1)

  const {skip, take} = getPage(currentPage)

  const count = await prisma.transaction.count({
    where: {
      address: user?.address
    }
  })

  const transactions = await prisma.transaction.findMany({
    where: {  address: user?.address  },
    skip, take,
    orderBy: {
      createdAt: "desc"
    },
  })

  return { 
    props: {
      user: JSON.stringify(user),
      nonce: JSON.stringify(nonce),
      data: JSON.stringify({count, transactions}),
      page: currentPage
    }, 
  }
  
}, sessionCookie())

interface IProps {
  user: string;
  nonce: string;
  data: string;
  page: number;
}

export default function Transactions(props: IProps) {

  const data = JSON.parse(props.data)

  return (
    <Layout nonce={props.nonce}>
      <div >
        <TransactionTable 
          columns={["Transaction Reference", "Amount", "Accepted Tokens", "Source", "Status", "Date Initialized"]}
          data={[...data.transactions]} page={props.page} counts={data.count}
          />
      </div>
    </Layout>
  )
}
