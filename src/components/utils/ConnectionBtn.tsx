import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import { RiLogoutBoxRLine } from 'react-icons/ri'


const ConnectionBtn = () => {

    const [show, setShow] = useState(false)

    const { currentUser, logOut, logIn } = useAuth()

    const notAuthenticated = (
        <button 
            onClick={logIn}
            className="px-6 md:px-10 rounded-lg h-10 text-sm bg-blue-800 text-white hover:bg-blue-900">
            Connect Wallet 
        </button>
    )

    const authenticated = (
        <div className='flex justify-center items-center'>
            <div onClick={() => setShow(!show)} className='text-sm sm:text-base sm:px-6 p-2 hover:cursor-pointer cursor-pointer rounded-3xl border-white border-[1px]'>
                <span> {currentUser.addr} </span>
            </div>
            <button 
                className='ml-2 p-2 hover:cursor-pointer cursor-pointer rounded-3xl border-white border-[1px]' 
                onClick={logOut}> 
                <RiLogoutBoxRLine /> 
            </button> 
        </div>
    )


    return (
        <div>
            { currentUser?.loggedIn ? authenticated : notAuthenticated }
        </div>
    )
}

export default ConnectionBtn