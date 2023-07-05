import { withIronSessionSsr } from 'iron-session/next'
import Layout from '@/components/utils/Layout'
import AuthCard from '@/components/utils/AuthCard'
import { sessionCookie, validateUser } from '@/services/session'
import { Transaction, User } from '@prisma/client'
import { toast } from 'react-toastify'
import Input from '@/components/utils/Input'
import LoadingButtonSM from '@/components/utils/LoadingButtonSM'
import LoadingButton from '@/components/utils/LoadingButton'
import useInput from '@/hooks/useInput'
import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import Link from 'next/link'
import { MdContentCopy } from 'react-icons/md'


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

export default function Integration(props: IProps) {

  const user: User = JSON.parse(props.user)

  const webhook = useInput("slug", 3)

  const [loadingWebhook, setLoadingWebhook] = useState(false)

  const copy = (value: string) => {
    navigator.clipboard.writeText(value)
    toast.success("Text copied to clipboard")
  }

  const updateWebhook = async() => {

    setLoadingWebhook(true)

    try {
        
      const body = { webhook_url: webhook.value }
      
      const res : AxiosResponse = await axios.post("/api/update-webhook", body)
      
      const data = res?.data

      toast.success(data.message)

      webhook.setValue(data.data)

    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e?.response?.data?.message)
      } else {
        console.error(e);
      }
    }

    setLoadingWebhook(false)
    
  }

  useEffect(() => {
    webhook.setValue(user?.webhookUrl as string)
  }, [])

  console.log(user)

  return (
    <Layout nonce={props.nonce}>

      <AuthCard title='Integration'>

        <div>

          <div className='flex p-1 py-2'>
            <p>Public Key: {user?.publicKey} </p>
            <button className='ml-2  hover:bg-gray-700 p-1 rounded-full' onClick={() => copy(user?.publicKey)}>
              <MdContentCopy />
            </button>
          </div>

          <div className='flex p-1 py-2'>
            <p>Secret Key: {user?.secretKey} </p>
            <button className='ml-2 hover:bg-gray-700 p-1 rounded-full' onClick={() => copy(user?.secretKey)}>
              <MdContentCopy />
            </button>
          </div>

          <hr />

        </div>

        <h3 className='mt-4 text-xl font-bold'>Webhook endpoint</h3>

        <div className='grid'>

          <div className='p-1 py-2 max-w-[600px]'>

            <Input type='webhook' value={webhook.value} onChange={webhook.setValue} />

            <div className='w-[200px]'>
              <LoadingButton loading={loadingWebhook} onClick={updateWebhook}>Save</LoadingButton>
            </div>

          </div>

          <hr />

        </div>

        <h3 className='mt-4 text-xl font-bold'>How to use</h3>

        <p>
          You can learn more about our api from the link below <br />
          <Link target='_blank' href={"https://flow-merchant.gitbook.io/flow-merchant/"}>
            https://flow-merchant.gitbook.io/flow-merchant/
          </Link>
        </p>

      </AuthCard>

    </Layout>
  )
}
