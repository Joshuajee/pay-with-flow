import { withIronSessionSsr } from 'iron-session/next'
import { useContext, useEffect, useState } from 'react'
import Layout from '@/components/utils/Layout'
import AuthCard from '@/components/utils/AuthCard'
import { sessionCookie, validateUser } from '@/services/session'
import TokenControl from '@/components/utils/TokenControl'
import LoadingButtonSM from '@/components/utils/LoadingButtonSM'
import CreatePaymentForm from '@/components/modals/CreatePaymentForm'
import { API_ROUTES, SUPPORTED_TOKENS } from '@/libs/enums'
import { AuthContext } from '@/contexts/AuthContext'
import getPriceOutput from '@/flow/scripts/incrementFi/getPriceOutput'
import { contract } from '@/libs/utils'
import { compareSync } from 'bcryptjs'
import useInput from '@/hooks/useInput'
import Input from '@/components/utils/Input'
import LoadingButton from '@/components/utils/LoadingButton'
import axios from 'axios'
import { toast } from 'react-toastify'


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

  const user = JSON.parse(props.user)

  const { userProfile } = useContext(AuthContext)

  const email = useInput("email")

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const update = async () => {
    setLoading(true)
    try {
      await axios.post(API_ROUTES.UPDATE_PROFILE, { email: email.value })
      toast.success("Updated successfully")
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e?.response?.data?.message)
      } else {
        toast.error("An error occurred")
        console.error(e);
      }
    }
    setLoading(false)
  }


  useEffect(() => {
    email.setValue(user.email)
  }, [])


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

          <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-2'>

            <TokenControl token={SUPPORTED_TOKENS.FLOW}  />

            <TokenControl token={SUPPORTED_TOKENS.TUSD} />

            <TokenControl token={SUPPORTED_TOKENS.TEUR} />

            <TokenControl token={SUPPORTED_TOKENS.TGBP} />
            
          </div>

          <div className='border-[1px] p-4 rounded-md mt-2 w-full'>

            <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-2'>

              <div className=''>

                <Input 
                  label='Email' type='email' 
                  value={email.value} onChange={email.setValue} />

                  <LoadingButton disabled={email?.error} loading={loading} onClick={update}> Save </LoadingButton>

              </div>

            </div>

          </div>

        </>

      </AuthCard>

      <CreatePaymentForm open={open} handleClose={handleClose} />

    </Layout>
  )
}
