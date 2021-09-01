import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './AccessApp.module.css'

const Register = (props) => {
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('form register')
    }

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.inputContainer}>
                <TextField id="outlined-basic" label="Email" type="text" variant="outlined" />
            </div>
            <div className={styles.inputContainer}>
                <TextField id="outlined-basic" label="Password" type="password" variant="outlined" />
            </div>
            <div className={styles.inputContainer}>
                <TextField id="outlined-basic" label="Confirm Password" type="password" variant="outlined" />
            </div>
            <div className={styles.inputContainer}>
                <Button variant="contained" color="primary" type="submit" className={styles.submitBtn}>
                    Register
                </Button>
            </div>
        </form>
    )
}

export default Register