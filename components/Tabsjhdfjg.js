import { useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import styles from './PeopleTabs.module.css'
import PersonalBill from './PersonalBill';

const PeopleTabs = (props) => {
  console.log(props.bill.bill_recipients)
  const sortedBillRecipients = props.bill.bill_recipients.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) || []
  const [activePerson, setActivePerson] = useState(props.bill.bill_recipients[0])

  // useEffect(() => {
  //   setActivePerson(props.bill.bill_recipients.reduce((a, b) => (new Date(a.updated_at) > new Date(b.updated_at) ? a : b)))
  // }, [props.bill.bill_recipients])

  const handleSetActivePerson = (billRecipient) => {
    setActivePerson(billRecipient)
  }

  return (
    <div className={styles.tabContainer}>
        <div className={styles.tabs}>
          {sortedBillRecipients.map(billRecipient => (
            <div key={billRecipient.id} 
              onClick={() => setActivePerson(billRecipient)}
              className={`${styles.tabBtn} ${activePerson === billRecipient && styles.activeTab}`}
              >
              {billRecipient.recipient_name[0]}
            </div>
          ))}
      </div>
      <div className={styles.tabContent} >
        <PersonalBill 
            billRecipient={activePerson}
            bill={props.bill}
            updateBill={props.updateBill}
            handleSetActivePerson={handleSetActivePerson}
        />
      </div>
    </div>

  )
};

export default PeopleTabs