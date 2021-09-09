import Link from 'next/link'
import styles from './NewBillBtn.module.css'

const NewBillBtn = () => (
        <div className={styles.newBtnContainer}>
            <Link href="/bills/create-bill" passHref >
                <button className={styles.newBtn}>
                        New Bill
                </button>
            </Link>
        </div>
)

export default NewBillBtn