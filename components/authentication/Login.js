import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './AccessApp.module.css'
import { useContext, useRef } from 'react';
import AuthenticationContext from '../../store/authentication-store';
import { useRouter } from 'next/router'

const Login = (props) => {
    const router = useRouter()
    const ctx = useContext(AuthenticationContext)
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (emailRef.current.value === "" || passwordRef.current.value === "") { return }
        const response = await ctx.handleAppAccess("login", emailRef.current.value, passwordRef.current.value)
        if (response.status === 200) {
            router.push('/bills')
        } else  {
            router.push('/')
            props.handleErrorMessage(response.data.error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.inputContainer}>
                <TextField id="outlined-basic" label="Email" type="text" variant="outlined" inputRef={emailRef} />
            </div>
            <div className={styles.inputContainer}>
                <TextField id="outlined-basic" label="Password" type="password" variant="outlined" inputRef={passwordRef} />
            </div>
            <div className={styles.inputContainer}>
                <Button variant="contained" color="primary" type="submit" className={styles.submitBtn}>
                    Login
                </Button>
            </div>
            
        </form>
    )
}

export default Login