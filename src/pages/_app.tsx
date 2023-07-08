import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Router from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from '@/contexts/AuthContext'
import '@/flow/config'
import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, [])

  //Binding events. 
  Router.events.on('routeChangeStart', () => NProgress.start()); 
  Router.events.on('routeChangeComplete', () => NProgress.done()); 
  Router.events.on('routeChangeError', () => NProgress.done());

  return( 
    <AuthProvider>
      <ToastContainer autoClose={3000} hideProgressBar={true} position="bottom-right" theme='dark'/>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
