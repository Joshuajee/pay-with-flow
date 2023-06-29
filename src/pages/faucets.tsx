import { withIronSessionSsr } from 'iron-session/next'
import Layout from '@/components/utils/Layout'
import AuthCard from '@/components/utils/AuthCard'
import { sessionCookie, validateUser } from '@/services/session'
import { SUPPORTED_TOKENS } from '@/libs/enums'
import TokenFaucet from '@/components/utils/TokenFaucet'


export const getServerSideProps = withIronSessionSsr(async({req}) => {

  const  { user, nonce }  = await validateUser(req)

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


export default function Faucets(props: IProps) {


  return (
    <Layout nonce={props.nonce}>

      <AuthCard title='Faucets'>

        <div className='flex items-center h-[80%]'>

          <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-2 '>

            <TokenFaucet token={SUPPORTED_TOKENS.FLOW}  />

            <TokenFaucet token={SUPPORTED_TOKENS.TUSD} />

            <TokenFaucet token={SUPPORTED_TOKENS.TEUR} />

            <TokenFaucet token={SUPPORTED_TOKENS.TGBP} />

          </div>

        </div>

      </AuthCard>

    </Layout>
  )

}
