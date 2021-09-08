import { useContext, useEffect, useRef, useState } from "react"
import { useRouter } from 'next/router'
// import AuthenticationContext from "../../store/authentication-store"
// import GroupBill from "../../components/GroupBill"
import { useCookies } from 'react-cookie';
import styles from "../../components/GroupBill.module.css"
import axios from 'axios'

const CreateBill = () => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const billNameRef = useRef("")
    // const [bill, setBill] = useState({ id: null, bill_name: "" })
    const [billNameError, setBillNameError] =useState(false)
    const router = useRouter()
    const requestHeaders = { headers: { 'Authorization': cookies.token } }

    useEffect(() => {
        if (!cookies.token) { router.push('/') }
    })

    const handleNewBillInitiation = async (event) => {
        event.preventDefault()
        billNameRef.current.value === "" ? setBillNameError(true) : setBillNameError(false)
        const newBill = { bill: { bill_name: billNameRef.current.value } }
        try {
            let response = await axios.post(`${process.env.API_URL}/api/bills`, newBill, requestHeaders)
            let data = response.data
            console.log(data)
            router.push(`/bills/${data.id}`)
            // setBill({id: data.id, bill_name: data.bill_name})
        } catch (error) {
            console.error(error)
        }           
    }
    


    return (
        <>
            <div style={{textAlign: 'center'}}>    
                <img src='../split_logo.png' alt='logo' style={{width: '50%'}}/>
            </div>
            <div className={styles.newPersonContainer}>
                <form onSubmit={handleNewBillInitiation} >
                    <input 
                        type="text" 
                        name="billName" 
                        placeholder="bill name"
                        className={`${styles.formInputs} ${billNameError ? styles.inputError : ""}`} 
                        ref={billNameRef} 
                    />
                    <input type="submit" value="Add" className={styles.formSubmit}/>
                </form>
            </div>
        </>
    )
}

export default CreateBill