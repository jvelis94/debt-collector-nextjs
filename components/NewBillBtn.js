import Link from 'next/link'
import styles from './NewBillBtn.module.css'

const NewBillBtn = () => (
    <div className={styles.newBtnContainer}>
        <button className={styles.newBtn}>
            <Link href="/bills/create-bill">
                New Bill
            </Link>
        </button>
    </div>
)

export default NewBillBtn