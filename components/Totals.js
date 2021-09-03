import styles from './Totals.module.css'
import React, {useState} from 'react'

const Totals = (props) => {
    const billRecipient = props.billRecipient

    const [taxOption, setTaxOption] = useState("no tax")

    const handleTaxActions = () => {
        if (billRecipient.tax === 0) {
            props.addTax()
            setTaxOption("no tax")
        } else {
            props.eliminateTax()
            setTaxOption("add tax")
        }
    }


    return (
        <ul>
            <li className={styles.totals}>
                <span>Subtotal</span>
                <span className={styles.spanCenter}>${billRecipient.subtotal}</span>
            </li>
            <li className={styles.totals}>
                <div>
                    <span>Tax ({billRecipient['tax'] === 0 ? 0 : 8.875/100}%)</span>
                    <input type="button" value={taxOption} onClick={handleTaxActions} className={styles.taxButton}/>
                </div>

                <span className={styles.spanCenter}>${Math.round(100*billRecipient['tax'])/100}</span>
            </li>
            <li className={styles.totals}>
                <span>Tip</span>
                <span className={styles.spanCenter}>${billRecipient.tip}</span>
            </li>
            <li className={`${styles.totals} ${styles.ultimateTotal}`}>
                <span>Total</span>
                <span className={styles.spanCenter}>${billRecipient.total_owes}</span>
            </li>
        </ul>
    )

}


export default Totals