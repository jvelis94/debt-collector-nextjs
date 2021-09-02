import { useContext, useEffect } from "react"
import { useRouter } from 'next/router'
// import AuthenticationContext from "../../store/authentication-store"
import GroupBill from "../../components/GroupBill"

const Bills = () => {
    const router = useRouter()

    useEffect(() => {
        if (!localStorage.token) { router.push('/') }
    })
    


    return (
        <div>
            <GroupBill />
        </div>
    )
}

export default Bills