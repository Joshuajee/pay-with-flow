import { withIronSessionSsr } from 'iron-session/next'
import { useState } from 'react'
import Layout from '@/components/utils/Layout'
import AuthCard from '@/components/utils/AuthCard'
import { sessionCookie, validateUser } from '@/services/session'
import TokenControl from '@/components/utils/TokenControl'
import LoadingButtonSM from '@/components/utils/LoadingButtonSM'
import { SUPPORTED_TOKENS } from '@/libs/enums'


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

      <AuthCard title='Dashboard'>

        <>

          <h3 className='text-xl mb-4'>Supported Tokens</h3>

          <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-2 '>

            <TokenControl token={SUPPORTED_TOKENS.FLOW}  />

            <TokenControl token={SUPPORTED_TOKENS.TUSD} />

            <TokenControl token={SUPPORTED_TOKENS.TEUR} />

            <TokenControl token={SUPPORTED_TOKENS.TGBP} />

          </div>

        </>

      </AuthCard>

    </Layout>
  )

}
