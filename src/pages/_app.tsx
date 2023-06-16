import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from '@/contexts/AuthContext'


export default function App({ Component, pageProps }: AppProps) {
  return( 
    <AuthProvider>
      <ToastContainer autoClose={3000} hideProgressBar={true} position="bottom-right" theme='dark'/>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
