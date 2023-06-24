import { withIronSessionSsr } from 'iron-session/next'
import Layout from '@/components/utils/Layout'
import AuthCard from '@/components/utils/AuthCard'
import { sessionCookie, validateUser } from '@/services/session'
import Input from '@/components/utils/Input'
import useInput from '@/hooks/useInput'
import { text } from 'stream/consumers'


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


export default function Profile(props: IProps) {

  const user = JSON.parse(props.user)

  const first = useInput("text", 3)
  const last = useInput("text", 3)
  const email = useInput("email")


  return (
    <Layout nonce={props.nonce}>

      <AuthCard title='Profile'>

        <div className='flex justify-center items-center h-[80%]'>

          <div className='border-[1px] p-4 rounded-md w-full max-w-[600px]'>

            <Input label='First name' type='text' value={first.value} onChange={first.setValue} />


          </div>

        </div>
        
      </AuthCard>

    </Layout>
  )
}
