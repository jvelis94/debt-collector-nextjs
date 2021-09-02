import IndividualItem from "./IndividualItem"
import ItemForm from './ItemForm'
import Totals from "./Totals"
import styles from './IndividualItem.module.css'
import ShareBill from "./ShareBill"


const PersonalBill = (props) => {
    const person = props.person


    return (
        <div>
            <div className={styles.personalBillContainer}>
                <div className={styles.nameAndShareDiv}>
                    <h1>{person.name}</h1>
                    <ShareBill person={person} />
                </div>
                <ItemForm addItemToPerson={props.addItemToPerson} personId={person.id} />
            </div>
            <div className={styles.billDetailsContainer}>
                <div className={styles.itemsHeaders}>
                    <h4> </h4>
                    <h4 style={{textIndent: "4px"}}>Item</h4>
                    <h4 className={styles.centerMoneyQuantity}>Qty</h4>
                    <h4 className={styles.centerMoneyQuantity}>Price</h4>
                </div>
                {person.items.map(item => (
                    <IndividualItem
                        key={`${person.id}${item.name}`}
                        item={item} 
                        incrementItemQuantity={props.incrementItemQuantity}
                        decrementItemQuantity={props.decrementItemQuantity}
                        removeItemFromPerson={props.removeItemFromPerson}
                        personId={person.id}
                    />
                ))}
            </div>
            <Totals person={person} eliminateTax={props.eliminateTax} addTax={props.addTax} />

        </div>
    )

}


export default PersonalBill