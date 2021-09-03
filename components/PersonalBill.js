import IndividualItem from "./IndividualItem"
import ItemForm from './ItemForm'
import Totals from "./Totals"
import styles from './IndividualItem.module.css'
import ShareBill from "./ShareBill"


const PersonalBill = (props) => {
    const billRecipient = props.billRecipient


    return (
        <div>
            <div className={styles.personalBillContainer}>
                <div className={styles.nameAndShareDiv}>
                    {/* <h1>{person.name}</h1> */}
                    <h1>{billRecipient.recipient_name}</h1>
                    <ShareBill billRecipient={billRecipient} />
                </div>
                <ItemForm addItemToPerson={props.addItemToPerson} billRecipient={billRecipient.id} />
            </div>
            <div className={styles.billDetailsContainer}>
                <div className={styles.itemsHeaders}>
                    <h4> </h4>
                    <h4 style={{textIndent: "4px"}}>Item</h4>
                    <h4 className={styles.centerMoneyQuantity}>Qty</h4>
                    <h4 className={styles.centerMoneyQuantity}>Price</h4>
                </div>
                {billRecipient.bill_items.map(billItem => (
                    <IndividualItem
                        key={`${billRecipient.id}${billItem.item_name}`}
                        billItem={billItem} 
                        incrementItemQuantity={props.incrementItemQuantity}
                        decrementItemQuantity={props.decrementItemQuantity}
                        removeItemFromPerson={props.removeItemFromPerson}
                        billRecipientId={billRecipient.id}
                    />
                ))}
            </div>
            <Totals billRecipient={billRecipient} eliminateTax={props.eliminateTax} addTax={props.addTax} />

        </div>
    )

}


export default PersonalBill