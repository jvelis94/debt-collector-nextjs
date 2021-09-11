import styles from './IndividualItem.module.css'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios'
import { useCookies } from 'react-cookie';
import { useState } from 'react';


const IndividualItem = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const billItem = props.billItem
    const [quantity, setQuantity] = useState(billItem.quantity)


    const incrementQty = async () => {
        const response = await axios({ method: 'patch', 
            url: `${process.env.API_URL}/api/bills/${billItem.bill_id}/bill_items/${billItem.id}/increment_quantity`,
            data: { bill_recipient_id: props.billRecipientId },
            headers: {
              Authorization: cookies.token
            }
        })
        setQuantity(prevState => prevState += 1)
        const newBill = response.data
        props.updateBill(newBill)
    }

    const decrementQty = async () => {
        if (quantity > 1) {
            const response = await axios({ method: 'patch', 
                url: `${process.env.API_URL}/api/bills/${billItem.bill_id}/bill_items/${billItem.id}/decrement_quantity`,
                data: { bill_recipient_id: props.billRecipientId },
                headers: {
                  Authorization: cookies.token
                }
            })
            setQuantity(prevState => prevState -= 1)
            const newBill = response.data
            props.updateBill(newBill)
        }
    }

    const removeItem = async () => {
        props.removeBillItem(billItem.bill_id, billItem.id)
    }

    return (
        <div className={styles.itemFlex}>
            <ClearIcon style={{marginLeft: "4px", fontSize: '1.3rem', color: 'red'}} onClick={removeItem}/>
            <h4 style={{textIndent: "4px"}}>{billItem.item_name}</h4>
            <h4 className={styles.centerMoneyQuantity}>
                <div className={styles.centerActionItems}>
                    <RemoveIcon onClick={decrementQty} color={quantity === 1 ? 'disabled' : 'inherit'} disabled={quantity === 1 ? true : false} />
                    {quantity}
                    <AddIcon onClick={incrementQty}/>
                </div>
            </h4>
            <h4 className={styles.centerMoneyQuantity}>{billItem.price}</h4>
        </div>
    )
}

export default IndividualItem