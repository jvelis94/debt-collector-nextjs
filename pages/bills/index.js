import { useContext, useEffect } from "react"
import { useRouter } from 'next/router'
// import AuthenticationContext from "../../store/authentication-store"

const Bills = () => {
    const router = useRouter()

    useEffect(() => {
        if (!localStorage.token) { router.push('/') }
    })
    

    return (
        <div>
            <h1>This is the bills page</h1>
        </div>
    )
}

export default Bills