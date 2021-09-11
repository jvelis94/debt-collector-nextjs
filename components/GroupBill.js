import { useEffect, useState, useRef } from "react"
import PersonalBill from "./PersonalBill"
import styles from "./GroupBill.module.css"
import PeopleTabs from "./Tabs"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import { useCookies } from 'react-cookie';

const initialState = []

const GroupBill = (props) => {
    const [bill, setBill] = useState(props.bill)
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [taxRate, setTaxRate] = useState(bill.tax)
    const [gratuityRate, setGratuityRate] = useState(bill.gratuity)
    const newPersonRef = useRef()
    const [newPersonError, setNewPersonError] = useState(false)
    const [addPersonPlaceholder, setAddPersonPlaceholder] = useState("add new person")
    const [billRecipients, setBillRecipients] = useState(bill.bill_recipients || [])//this is people

    useEffect(() => {
        if (taxRate) {
            const delayDebounceFn = setTimeout(() => {
                axios({ method: 'patch', 
                url: `${process.env.API_URL}/api/bills/${bill.id}`, 
                data: {"tax": taxRate},
                headers: {
                  Authorization: cookies.token
                }
            }).then(response => {
                setBill(response.data)
                setBillRecipients(response.data.bill_recipients)
            })
            }, 1000)
        
            return () => clearTimeout(delayDebounceFn)
        }

    }, [taxRate])

    

    const handleNewPersonSubmit = async (event) => {
        event.preventDefault()
        console.log(billRecipients)
        if (newPersonRef.current.value === "") {
            setNewPersonError(true)
        }
        else {
            const addPerson = {recipient_name: newPersonRef.current.value, bill_id: props.bill.id}
            const token = cookies.token
            const response = await axios.post(`${process.env.API_URL}/api/bills/${props.bill.id}/bill_recipients`, addPerson, { headers: {'Authorization': token}})
    
            let newBill = response.data
            updateBill(newBill)
            newPersonRef.current.value = ""
        }
    }


    const incrementTipRate = () => {
        console.log('increasing tip')
        const newGratuityRate = gratuityRate + 0.01
        setGratuityRate(newGratuityRate)
        axios({ method: 'patch', 
            url: `${process.env.API_URL}/api/bills/${bill.id}`, 
            data: {"gratuity": newGratuityRate},
            headers: {
              Authorization: cookies.token
            }
        }).then(response => {
            setBill(response.data)
            setBillRecipients(response.data.bill_recipients)
        })
    }

    const decrementTipRate = () => {
        console.log('increasing tip')
        const newGratuityRate = gratuityRate - 0.01
        setGratuityRate(newGratuityRate)
        axios({ method: 'patch', 
            url: `${process.env.API_URL}/api/bills/${bill.id}`, 
            data: {"gratuity": newGratuityRate},
            headers: {
              Authorization: cookies.token
            }
        }).then(response => {
            setBill(response.data)
            setBillRecipients(response.data.bill_recipients)
        })
    }

    const updateBill = (bill) => {
        setBill(bill)
        setBillRecipients(bill.bill_recipients)
    }

    let tabsUi = (
        <PeopleTabs 
            billRecipients={billRecipients}
            bill={bill}
            updateBill={updateBill}
        />
    )

    let taxTipUi = (
        <div className={styles.billTaxTipContainer}>
            <div className={styles.centerActionItems}>
                    <h4 className={styles.taxTipHeaders}>Tax:</h4>
                    <input type="number" name="tax" className={styles.formInputs} onChange={(e) => setTaxRate(e.target.value)} value={taxRate}/>
                </div>
            <div className={styles.centerActionItems}>
                <h4 className={styles.taxTipHeaders}>Tip:</h4>
                <RemoveIcon onClick={decrementTipRate} />
                    {Math.round(gratuityRate*100)}%  
                <AddIcon onClick={incrementTipRate} />
            </div>
        </div>
    )
    let newPersonUI = (
        <div className={styles.newPersonContainer}>
            <form onSubmit={handleNewPersonSubmit} >
                <input 
                    type="text" 
                    name="name" 
                    placeholder={addPersonPlaceholder} 
                    className={`${styles.formInputs} ${newPersonError ? styles.inputError : ""}`} 
                    ref={newPersonRef} 
                />
                <input type="submit" value="Add" className={styles.formSubmit}/>
            </form>
        </div>
    )


    return (
        <>
            <div style={{textAlign: 'center'}}>
                <h1>{props.bill.bill_name}</h1>
            </div>

            {newPersonUI}
            
            {billRecipients.length > 0 && taxTipUi}
            {billRecipients.length > 0 && tabsUi}
        </>
    )
}

export default GroupBill