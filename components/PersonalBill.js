import IndividualItem from "./IndividualItem"
import ItemForm from './ItemForm'
import Totals from "./Totals"
import styles from './IndividualItem.module.css'
import ShareBill from "./ShareBill"
import { useState } from "react"
import axios from 'axios'
import { useCookies } from "react-cookie"
import Link from 'next/link'
import Image from 'next/image'
import venmo from '../public/venmo.svg'

const PersonalBill = (props) => {
    const billRecipient = props.billRecipient
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const billItems = billRecipient.bill_items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) || []
    
    const removeBillItem = async (billId, billItemId) => {
        console.log("in personalBill component")
        const response = await axios({ method: 'delete', 
            url: `${process.env.API_URL}/api/bills/${billId}/bill_items/${billItemId}`,
            data: { bill_recipient_id: billRecipient.id, bill_id: billId },
            headers: {
              Authorization: cookies.token
            }
        })
        const newBill = response.data
        console.log(newBill)
        props.updateBill(newBill)
    }

    const addBillItem = async (name, price, billRecipientId, billId) => {
        console.log(`adding ${name} to person`)
        const data = { "item_name": name, "price": price, "bill_id": billId, "bill_recipient_id": billRecipientId}
        const response = await axios.post(`${process.env.API_URL}/api/bills/${billId}/bill_items`, data, { headers: {'Authorization': cookies.token}})
        const newBill = response.data
        props.updateBill(newBill)
        // props.setActivePerson(billRecipient)
    }

    const handleBillPaid = async () => {
        if (!billRecipient.is_paid) {
            const data = { "bill_recipient_id": billRecipient.id}
            const response = await axios.patch(`${process.env.API_URL}/api/bills/${billRecipient.bill_id}/bill_recipients/${billRecipient.id}/mark_is_paid`, data, { headers: {'Authorization': cookies.token}})
            const newBill = response.data
            props.updateBill(newBill)
        }
    }

    const billSummaryUi = (
        <>
            <div className={styles.billDetailsContainer}>
                {billItems.length === 0  && <h4>Add some items</h4>}
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
                        removeBillItem = {removeBillItem}
                        billRecipientId={billRecipient.id}
                        updateBill={props.updateBill}
                    />
                ))}
            </div>
            <div>
                <Totals billRecipient={billRecipient} bill={props.bill}/>
            </div>
        </>
    )

    return (
        <div>
            <div className={styles.personalBillContainer}>
                <div className={styles.nameAndShareDiv}>
                    <div className={styles.nameAndPaidDiv}>
                        <h1>{billRecipient.recipient_name} </h1>
                        <small 
                            className={styles.paidBox}
                            style={{backgroundColor: billRecipient.is_paid ? "green" : "grey"}}
                            onClick={handleBillPaid}
                        >
                        {billRecipient.is_paid ? "Paid" : "Mark paid"} 
                            
                        </small>
                    </div>
                    <div className={styles.nameAndShareDiv}>
                        {billItems.length > 0 && <ShareBill billRecipient={billRecipient} />}
                        <Link href="venmo://pay?recipients" passHref>
                            <Image 
                                src={venmo}
                                alt="venmo icon" 
                                width={25}
                                height={25}
                            />
                        </Link>
                    </div>
                </div>
                <ItemForm billRecipient={billRecipient} addBillItem={addBillItem} />
            </div>

            {billItems.length === 0 && <h4 style={{textAlign:"center"}}>Add some items to see a breakdown</h4>}
            {billItems.length > 0 && billSummaryUi}
            

        </div>
    )

}


export default PersonalBill