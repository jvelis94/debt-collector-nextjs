import IndividualItem from "./IndividualItem"
import ItemForm from './ItemForm'
import Totals from "./Totals"
import styles from './IndividualItem.module.css'
import ShareBill from "./ShareBill"
import { useState } from "react"
import axios from 'axios'
import { useCookies } from "react-cookie"

const PersonalBill = (props) => {
    const billRecipient = props.billRecipient
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [billItems, setBillItems] = useState(billRecipient.bill_items || [])
    
    const removeBillItem = async (billId, billItemId) => {
        console.log("in personalBill component")
        const response = await axios({ method: 'delete', 
            url: `http://localhost:3000/api/bills/${billId}/bill_items/${billItemId}`,
            headers: {
              Authorization: cookies.token
            }
        })
        
        setBillItems(prevState => prevState.filter(item => item.id != billItemId))

        props.updateBillRecipients(response.data.bill_recipient)
    }

    const addBillItem = async (name, price, billRecipientId, billId) => {
        console.log(`adding ${name} to person`)
        const data = { "item_name": name, "price": price, "bill_id": billId, "bill_recipient_id": billRecipientId}
        const response = await axios.post(`http://localhost:3000/api/bills/${billId}/bill_items`, data, { headers: {'Authorization': cookies.token}})
        const newBillItem = response.data
        console.log(response.data)
        setBillItems(prevState => [...prevState, newBillItem])
        props.updateBillRecipients(response.data.bill_recipient)
    }

    // const updateRecipientTotals = (billRecipient, billRecipientIndex, price, type="add") => {
    //     type ==="add" ? billRecipient['subtotal'] += parseFloat(parseInt(price)) : billRecipient['subtotal'] -= parseFloat(parseInt(price))
    //     billRecipient['tax'] = Math.round(100*(billRecipient['subtotal']) * taxRate)/100
    //     billRecipient['tip'] = Math.round(100*(billRecipient['subtotal']) * tipRate)/100
    //     billRecipient['total'] = Math.round(100*(billRecipient['subtotal'] + billRecipient['tax'] + billRecipient['tip']))/100

    //     setBillRecipients(prevState => {
    //         let newState = [...prevState]
    //         newState[personIndex] = billRecipient
    //         return newState
    //     })
    // }


    return (
        <div>
            <div className={styles.personalBillContainer}>
                <div className={styles.nameAndShareDiv}>
                    {/* <h1>{person.name}</h1> */}
                    <h1>{billRecipient.recipient_name}</h1>
                    {billItems.length > 0 && <ShareBill billRecipient={billRecipient} />}
                </div>
                <ItemForm addItemToPerson={props.addItemToPerson} billRecipient={billRecipient} addBillItem={addBillItem} />
            </div>
            <div className={styles.billDetailsContainer}>
                <div className={styles.itemsHeaders}>
                    <h4> </h4>
                    <h4 style={{textIndent: "4px"}}>Item</h4>
                    <h4 className={styles.centerMoneyQuantity}>Qty</h4>
                    <h4 className={styles.centerMoneyQuantity}>Price</h4>
                </div>
                {billItems.map(billItem => (
                    <IndividualItem
                        key={`${billRecipient.id}${billItem.item_name}`}
                        billItem={billItem} 
                        incrementItemQuantity={props.incrementItemQuantity}
                        decrementItemQuantity={props.decrementItemQuantity}
                        removeBillItem = {removeBillItem}
                        removeItemFromPerson={props.removeItemFromPerson}
                        billRecipientId={billRecipient.id}
                        updateBillRecipients={props.updateBillRecipients}
                    />
                ))}
            </div>
            <Totals billRecipient={billRecipient} eliminateTax={props.eliminateTax} addTax={props.addTax} bill={props.bill}/>

        </div>
    )

}


export default PersonalBill