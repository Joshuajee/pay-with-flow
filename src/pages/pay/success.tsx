import { useEffect, useState } from 'react'
import Card from '@/components/utils/Card'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'


interface IProps {
    user: string;
    nonce: string;
    data: string;
}


export default function Home() {

    const router = useRouter()

    const redirect = router?.query?.redirect

    useEffect(() => {
        setTimeout(() => {
            if (redirect != null) router.push(String(redirect))
        }, 3000)
    }, [])

    return (
        <div className='flex h-screen justify-center items-center'>
            
            <div className='w-full max-w-lg'>

                <Card>

                    <div className="flex flex-col items-center">

                        <div className='w-48'>

                            <lottie-player 
                                src="https://assets8.lottiefiles.com/packages/lf20_lk80fpsm.json"  
                                background="transparent"  
                                speed="1"  autoplay />

                        </div>

                        <p className='text-2xl font-bold'>Payment was successful</p>

                    </div>

                </Card>

            </div>

        </div>
    )
}
