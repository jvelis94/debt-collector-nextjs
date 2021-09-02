import { AuthenticationContextProvider } from '../store/authentication-store'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
    <AuthenticationContextProvider>
      <Component {...pageProps} />
    </AuthenticationContextProvider>
  )
}

export default MyApp
