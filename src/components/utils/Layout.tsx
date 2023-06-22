import { ReactNode, useEffect } from 'react';
import Navbar from '../navigation/Navbar';
import Container from './Container';
import SideNav from '../navigation/SideNav';
import { LOCAL_STORAGE } from '@/libs/enums';

interface IProps {
    children: ReactNode;
    nonce: string;
    
}

const Layout = ({children, nonce} : IProps) => {

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE.NONCE, JSON.parse(nonce))
    }, [])

    return (
        <div className={`bg-[#22262E]`}>
            <div className={`flex flex-col min-h-screen overflow-hidden`}>
                <Navbar />
                <div className='relative top-16 flex-grow'>
                    <Container>
                        <div className='grid grid-cols-12 w-full gap-10'>

                            <div className='col-span-3'>
                                <SideNav />
                            </div>

                            <div className='col-span-9 overflow-auto'>
                                {children}
                            </div>
                       
                        </div>
      
                    </Container>
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    )
}

export default Layout