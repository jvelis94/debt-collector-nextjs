import styles from './IndividualItem.module.css'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';


const IndividualItem = (props) => {
    const item = props.item

    const incrementQty = (name, personId) => {
        props.incrementItemQuantity(item.name, props.personId)
    }

    const decrementQty = () => {
        props.decrementItemQuantity(item.name, props.personId)
    }

    const removeItem = () => {
        props.removeItemFromPerson(item.name, props.personId)
    }

    return (
        <div className={styles.itemFlex}>
            <ClearIcon style={{marginLeft: "4px"}} onClick={removeItem}/>
            <h4 style={{textIndent: "4px"}}>{item.name}</h4>
            <h4 className={styles.centerMoneyQuantity}>
                <div className={styles.centerActionItems}>
                    <RemoveIcon onClick={decrementQty} color={item.qty === 1 ? 'disabled' : 'inherit'} />
                    {item.qty}
                    <AddIcon onClick={incrementQty}/>
                </div>
            </h4>
            <h4 className={styles.centerMoneyQuantity}>{item.price}</h4>
        </div>
    )
}

export default IndividualItem