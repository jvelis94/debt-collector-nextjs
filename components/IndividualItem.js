import styles from './IndividualItem.module.css'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';


const IndividualItem = (props) => {
    const billItem = props.billItem

    const incrementQty = () => {
        props.incrementItemQuantity(billItem.name, props.billRecipientId)
    }

    const decrementQty = () => {
        props.decrementItemQuantity(billItem.name, props.billRecipientId)
    }

    const removeItem = () => {
        props.removeItemFromPerson(billItem.name, props.billRecipientId)
    }

    return (
        <div className={styles.itemFlex}>
            <ClearIcon style={{marginLeft: "4px"}} onClick={removeItem}/>
            <h4 style={{textIndent: "4px"}}>{billItem.item_name}</h4>
            <h4 className={styles.centerMoneyQuantity}>
                <div className={styles.centerActionItems}>
                    <RemoveIcon onClick={decrementQty} color={billItem.quantity === 1 ? 'disabled' : 'inherit'} />
                    {billItem.quantity}
                    <AddIcon onClick={incrementQty}/>
                </div>
            </h4>
            <h4 className={styles.centerMoneyQuantity}>{billItem.price}</h4>
        </div>
    )
}

export default IndividualItem