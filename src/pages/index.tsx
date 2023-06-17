import { withIronSessionSsr } from 'iron-session/next'
import '@/flow/config'
import Layout from '@/components/utils/Layout'
import AuthCard from '@/components/utils/AuthCard'
import { sessionCookie, validateUser } from '@/services/session'
import TokenControl from '@/components/utils/TokenControl'
import LoadingButton from '@/components/utils/LoadingButton'
import LoadingButtonSM from '@/components/utils/LoadingButtonSM'
import { useState } from 'react'


export const getServerSideProps = withIronSessionSsr(async({req}) => {

  const  { user, nonce }  = await validateUser(req)

  console.log({ user, nonce })

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


export default function Home(props: IProps) {

  const [open, setOpen] = useState(false)

  return (
    <Layout nonce={props.nonce}>
      <AuthCard title='Dashboard'>

        <>

          <div className='flex justify-end mb-5'>
            <div> 
              <LoadingButtonSM onClick={() => setOpen(true)}>Create Transaction</LoadingButtonSM>
            </div>
          </div>

          <h3 className='text-xl mb-4'>Supported Tokens</h3>

          <div className='grid grid-cols-1 md:grid-cols-2 w-full  '>
            <TokenControl />
            <TokenControl />
          </div>

        </>

      </AuthCard>
    </Layout>
  )
}
