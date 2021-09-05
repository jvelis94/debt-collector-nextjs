import { useEffect, useState, useRef } from "react"
import PersonalBill from "./PersonalBill"
import styles from "./GroupBill.module.css"
import SimpleTabs from "./Tabs"
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
    const [billRecipients, setBillRecipients] = useState(bill.bill_recipients)//this is people

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            axios({ method: 'patch', 
            url: `http://localhost:3000/api/bills/${bill.id}`, 
            data: {"tax": taxRate},
            headers: {
              Authorization: cookies.token
            }
        }).then(response => setBill(response.data))
            // props.updateBill(tax)
        //   console.log(tax)
          // Send Axios request here
        }, 1000)
    
        return () => clearTimeout(delayDebounceFn)
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
            const response = await axios.post(`http://localhost:3000/api/bills/${props.bill.id}/bill_recipients`, addPerson, { headers: {'Authorization': token}})
    
            let newPerson = response.data
            setBillRecipients(prevState => [...prevState, newPerson])
        }
    }


    const incrementTipRate = () => {
        setGratuityRate(prevState => prevState += 0.01)
    }

    const decrementTipRate = () => {
        setGratuityRate(prevState => prevState -= 0.01)
    }

    const updateBillRecipients = (recipient) => {
        const recipientIndex = billRecipients.findIndex(person => person.id === recipient.id)
        const recipientBillItems = billRecipients[recipientIndex]['bill_items']
        recipient['bill_items'] = recipientBillItems
        setBillRecipients(prevState => {
            const updatedRecipients = [...prevState]
            updatedRecipients[recipientIndex] = recipient
            return [...updatedRecipients]
        })
    }


    const updateTax = async (tax) => {
        const response = await axios({ method: 'patch', 
            url: `http://localhost:3000/api/bills/${billId}`,
            headers: {
              Authorization: cookies.token
            }
        })
        props.updateBillRecipients(response.data.bill_recipient)
    }

    let tabsUi = (
        <SimpleTabs 
            billRecipients={billRecipients} 
            updateBillRecipients={updateBillRecipients}
            bill={bill}
        />
    )

    let taxTipUi = (
        <div className={styles.billTaxTipContainer}>
            <div className={styles.centerActionItems}>
                    <h4 className={styles.taxTipHeaders}>Tax:</h4>
                    <input type="number" name="tax" placeholder={`$${taxRate}`} className={styles.formInputs} onChange={(e) => setTaxRate(e.target.value)} value={`$${taxRate}`}/>
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
                <img src='../split_logo.png' alt='logo' style={{width: '30%'}}/>
                <h1>{props.bill.bill_name}</h1>
            </div>

            {newPersonUI}
            
            {billRecipients.length > 0 && taxTipUi}
            {billRecipients.length > 0 && tabsUi}
        </>
    )
}

export default GroupBill