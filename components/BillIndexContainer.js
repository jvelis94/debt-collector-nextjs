import styles from './BillIndexContainer.module.css'
import Link from 'next/link'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)


const BillIndexContainer = (props) => {
    const bill = props.bill

    const timeAgo = new TimeAgo('en-US')
    const billDate = timeAgo.format(new Date(bill.created_at), 'round')
    

    return (
        <Link href={`/bills/${bill.id}`} passHref>
            <div key={bill.id} className={styles.billContainer}>
                <h1 className={styles.headerSpacing}>{bill.bill_name}</h1>
                <div className={styles.billRecipientBtnsContainer}>
                {bill.bill_recipients.map(billRecipient => (
                    <button key={billRecipient.id} className={styles.billRecipientBtns}>{billRecipient.recipient_name}</button>
                ))}
                </div>
                <div className={styles.dateCreated}>
                    <span>Created {billDate}</span>
                </div>
            </div>
        </Link>
        
        
        
    )
}

export default BillIndexContainer