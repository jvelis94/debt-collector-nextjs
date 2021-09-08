import { useContext, useEffect } from 'react';
import AuthenticationContext, { AuthenticationContextProvider, ProtectRoutes } from '../store/authentication-store'
import '../styles/globals.css'
import { CookiesProvider } from 'react-cookie';


const MyApp = ({ Component, pageProps }) => {

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <CookiesProvider>
      <AuthenticationContextProvider>
          <Component {...pageProps} />
      </AuthenticationContextProvider>
    </CookiesProvider>
  )
}

export default MyApp
