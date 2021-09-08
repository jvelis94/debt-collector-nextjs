import { useState, useRef } from 'react'
import styles from './ItemForm.module.css'

const ItemForm = (props) => {
    const nameRef = useRef()
    const priceRef = useRef()
    const [newItemError, setNewItemError] = useState(false)
    const billRecipient = props.billRecipient

    const handleFormSubmit = (event) => {
        event.preventDefault()
        if (nameRef.current.value === "" || priceRef.current.value === "") {
            setNewItemError(true)
            return
        }
        setNewItemError(false)
        props.addBillItem(nameRef.current.value, priceRef.current.value, billRecipient.id, billRecipient.bill_id)
        nameRef.current.value = ""
        priceRef.current.value = ""
    }

    return (
        <form className={styles.formContainer} onSubmit={handleFormSubmit}>
            <input 
                type="text" 
                name="name" 
                placeholder="burger" 
                className={`${styles.formInputs} ${newItemError ? styles.inputError : ""}`}
                ref={nameRef} 
            />    
            <input 
                type="text" 
                name="price" 
                placeholder="20" 
                className={`${styles.formInputs} ${newItemError ? styles.inputError : ""}`}
                ref={priceRef} />
            <input type="submit" value="Add" className={styles.formSubmit}/>
        </form>
    )
}

export default ItemForm