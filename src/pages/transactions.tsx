import { withIronSessionSsr } from 'iron-session/next'
import Layout from '@/components/utils/Layout'
import AuthCard from '@/components/utils/AuthCard'
import '@/flow/config'
import { sessionCookie, validateUser } from '@/services/session'



export const getServerSideProps = withIronSessionSsr(async({req}) => {

  const { user, nonce } = await validateUser(req)

  return { 
    props: {
      user: JSON.stringify(user),
      nonce: JSON.stringify(nonce)
    }, 
  }
  
}, sessionCookie())

interface IProps {
  user: string;
  nonce: string;
}

export default function Transactions(props: IProps) {

  return (
    <Layout nonce={props.nonce}>
      <AuthCard title='Transactions'>
        Transactions
      </AuthCard>
    </Layout>
  )
}
