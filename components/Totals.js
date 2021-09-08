import styles from './Totals.module.css'
import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie';

const Totals = (props) => {
    const billRecipient = props.billRecipient
    
    return (
        <ul>
            <li className={styles.totals}>
                <span>Subtotal</span>
                <span className={styles.spanCenter}>${Math.round(100*(billRecipient.subtotal))/100}</span>
            </li>
            <li className={styles.totals}>
                <span>Tax:</span>
                <span className={styles.spanCenter}>${Math.round(100*(billRecipient.tax))/100}</span>

            </li>
            <li className={styles.totals}>
                <span>Tip</span>
                <span className={styles.spanCenter}>${Math.round(100*(billRecipient.gratuity))/100}</span>
            </li>
            <li className={`${styles.totals} ${styles.ultimateTotal}`}>
                <span>Total</span>
                <span className={styles.spanCenter}>${Math.round(100*(billRecipient.total_owes))/100}</span>
            </li>
        </ul>
    )

}


export default Totals