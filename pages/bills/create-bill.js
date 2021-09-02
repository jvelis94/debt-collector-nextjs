import { useContext, useEffect } from "react"
import { useRouter } from 'next/router'
// import AuthenticationContext from "../../store/authentication-store"
import GroupBill from "../../components/GroupBill"

const CreateBill = () => {
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

export default CreateBill