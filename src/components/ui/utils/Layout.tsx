import { ReactNode } from 'react';
import Footer from '../navigation/Footer';
import Navbar from '../navigation/Navbar';
import Container from './Container';
import SideNav from '../navigation/SideNav';

interface IProps {
    children: ReactNode
}

const Layout = ({children} : IProps) => {

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