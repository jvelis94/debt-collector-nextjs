import { useContext, useEffect } from 'react';
import AuthenticationContext, { AuthenticationContextProvider, ProtectRoutes } from '../store/authentication-store'
import '../styles/globals.css'
import { CookiesProvider } from 'react-cookie';


const MyApp = ({ Component, pageProps }) => {

  return (
    <CookiesProvider>
      <AuthenticationContextProvider>
          <Component {...pageProps} />
      </AuthenticationContextProvider>
    </CookiesProvider>
  )
}

export default MyApp
