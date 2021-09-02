import { useContext, useEffect } from 'react';
import AuthenticationContext, { AuthenticationContextProvider, ProtectRoutes } from '../store/authentication-store'
import '../styles/globals.css'



const MyApp = ({ Component, pageProps }) => {

  return (
    <AuthenticationContextProvider>
        <Component {...pageProps} />
    </AuthenticationContextProvider>
  )
}

export default MyApp
