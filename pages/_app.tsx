import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google';
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="<735119309965-pvtrb4ptlav3m7cp239jg1b2vtn1bt5d.apps.googleusercontent.com>">
        <Component {...pageProps} />
    </GoogleOAuthProvider>    
  )
}