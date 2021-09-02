import { useEffect, useState, useRef } from "react"
import PersonalBill from "./PersonalBill"
import styles from "./GroupBill.module.css"
import SimpleTabs from "./Tabs"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';

const initialState = []

const GroupBill = () => {
    const [people, setPeople] = useState(initialState)
    const [taxRate, setTaxRate] = useState(0.08875)
    const [tipRate, setTipRate] = useState(.18)
    const [currentId, setCurrentId] = useState(1)
    const newPersonRef = useRef()
    const [newPersonError, setNewPersonError] = useState(false)
    const [addPersonPlaceholder, setAddPersonPlaceholder] = useState("add new person")

    useEffect(() => {
        const updatedPeople = people.map(person => {
            let oldTip = person['tip']
            let newTip = Math.round(100*(person['subtotal']) * tipRate)/100
            person['tip'] = newTip
            person['total'] = Math.round(100*(person['total'] - oldTip + newTip))/100
            return person
        })

        setPeople(updatedPeople)

    }, [tipRate])

    const addItemToPerson = (name, price, personId) => {
        console.log(`adding ${name} to person`)
        let currentPersonIndex = people.findIndex(person => person.id === personId)
        let currentPerson = people.filter(person => person.id === personId)
        console.log(currentPerson)
        currentPerson[0]['items'].push({
            name: name,
            price: parseFloat(parseInt(price)),
            qty: 1
        })
        updateTotals(currentPerson[0], currentPersonIndex, price)
    }

    const incrementItemQuantity = (item, personId) => {
        let currentPersonIndex = people.findIndex(person => person.id === personId)
        let currentPerson = people.filter(person => person.id === personId)
        let updateItem = currentPerson[0]['items'].findIndex(el => el.name === item)
        currentPerson[0]['items'][updateItem]['qty'] += 1
        updateTotals(currentPerson[0], currentPersonIndex, currentPerson[0]['items'][updateItem]['price'])
    }

    const decrementItemQuantity = (item, personId) => {
        let currentPersonIndex = people.findIndex(person => person.id === personId)
        let currentPerson = people.filter(person => person.id === personId)
        let updateItem = currentPerson[0]['items'].findIndex(el => el.name === item)

        if (currentPerson[0]['items'][updateItem]['qty'] > 1) {
            currentPerson[0]['items'][updateItem]['qty'] -= 1
            updateTotals(currentPerson[0], currentPersonIndex, currentPerson[0]['items'][updateItem]['price'], "minus")
        }
    }

    const removeItemFromPerson = (item, personId) => {
        console.log('removing item')
        let currentPersonIndex = people.findIndex(person => person.id === personId)
        let currentPerson = people.filter(person => person.id === personId)
        let removeItem = currentPerson[0]['items'].findIndex(el => el.name === item)
        const removeItemTotal = (currentPerson[0]['items'][removeItem]['price']) * (currentPerson[0]['items'][removeItem]['qty'])
        currentPerson[0]['items'][removeItem]['qty'] = 0
        currentPerson[0]['items'].splice(removeItem, 1);
        updateTotals(currentPerson[0], currentPersonIndex, removeItemTotal, "minus")
    }


    const incrementTipRate = () => {
        setTipRate(prevState => prevState += 0.01)
    }

    const decrementTipRate = () => {
        setTipRate(prevState => prevState -= 0.01)
    }

    const updateTotals = (person, personIndex, price, type="add") => {
        type ==="add" ? person['subtotal'] += parseFloat(parseInt(price)) : person['subtotal'] -= parseFloat(parseInt(price))
        person['tax'] = Math.round(100*(person['subtotal']) * taxRate)/100
        person['tip'] = Math.round(100*(person['subtotal']) * tipRate)/100
        person['total'] = Math.round(100*(person['subtotal'] + person['tax'] + person['tip']))/100

        setPeople(prevState => {
            let newState = [...prevState]
            newState[personIndex] = person
            return newState
        })
    }

    const handleNewPersonSubmit = (event) => {
        event.preventDefault()
        if (newPersonRef.current.value === "") {
            setNewPersonError(true)
            return
        }
        let newPerson = {
            id: currentId,
            name: newPersonRef.current.value,
            items: [],
            subtotal: 0,
            tax: 0,
            tip: 0,
            total: 0
        }
        setPeople(prevState => [...prevState, newPerson])
        setCurrentId(prevState => prevState +=1)
        newPersonRef.current.value = ""
        setNewPersonError(false)
        setAddPersonPlaceholder("add another person")
    }

    const eliminateTax = () => {
        // console.log('eliminating tax')
        setTaxRate(0)
        let newPeople = people.map(person => {
            person['tax'] = 0
            person['total'] = Math.round(100*(person['subtotal'] + person['tax'] + person['tip']))/100
            return person
        })
        setPeople([...newPeople])
    }

    const addTax = () => {
        // console.log('eliminating tax')
        setTaxRate(0.08875)
        let newPeople = people.map(person => {
            person['tax'] = person['subtotal'] * 0.08875
            person['total'] = Math.round(100*(person['subtotal'] + person['tax'] + person['tip']))/100
            return person
        })
        setPeople([...newPeople])
    }

    let tabsUi = (
        <SimpleTabs 
            people={people} 
            addItemToPerson={addItemToPerson} 
            incrementItemQuantity={incrementItemQuantity}
            decrementItemQuantity={decrementItemQuantity}
            removeItemFromPerson={removeItemFromPerson}
            eliminateTax={eliminateTax}
            addTax={addTax}
        />
    )

    let tipUi = (
        <div className={styles.centerActionItems}>
            <h4>Tip:</h4>
            <RemoveIcon onClick={decrementTipRate} />
                {Math.round(tipRate*100)}%  
            <AddIcon onClick={incrementTipRate} />
        </div>
    )

    return (
        <>
            <div style={{textAlign: 'center'}}>
                <img src='./split_logo.png' alt='logo' style={{width: '50%'}}/>
            </div>
            <div className={styles.newPersonContainer}>
                <form onSubmit={handleNewPersonSubmit} >
                    <input 
                        type="text" 
                        name="name" 
                        placeholder={addPersonPlaceholder} 
                        className={`${styles.formInputs} ${newPersonError ? styles.inputError : ""}`} 
                        ref={newPersonRef} 
                    />
                    <input type="submit" value="Add" className={styles.formSubmit}/>
                </form>
            </div>

            {people.length > 0 && tabsUi}
            {people.length > 0 && tipUi}
        </>
    )
}

export default GroupBill