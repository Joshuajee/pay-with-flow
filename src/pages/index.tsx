import { withIronSessionSsr } from 'iron-session/next'
import { useContext, useState } from 'react'
import Layout from '@/components/utils/Layout'
import AuthCard from '@/components/utils/AuthCard'
import { sessionCookie, validateUser } from '@/services/session'
import TokenControl from '@/components/utils/TokenControl'
import LoadingButtonSM from '@/components/utils/LoadingButtonSM'
import CreatePaymentForm from '@/components/modals/CreatePaymentForm'
import { SUPPORTED_TOKENS } from '@/libs/enums'
import { AuthContext } from '@/contexts/AuthContext'


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


export default function Home(props: IProps) {

  const { userProfile } = useContext(AuthContext)

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

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

          <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-2 '>

            <TokenControl token={SUPPORTED_TOKENS.FLOW}  />

            <TokenControl token={SUPPORTED_TOKENS.TUSD} />

            <TokenControl token={SUPPORTED_TOKENS.TEUR} />

            <TokenControl token={SUPPORTED_TOKENS.TGBP} />
          </div>

        </>

      </AuthCard>

      <CreatePaymentForm open={open} handleClose={handleClose} />

    </Layout>
  )
}
