

import dynamic from 'next/dynamic'
const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), { ssr: false }) // disable ssr
import { Tab, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import PersonalBill from './PersonalBill';
import styles from './Tabs.module.css'

const PeopleTabs = (props) => {
  const sortedBillRecipients = props.bill.bill_recipients.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) || []
  return (
    <Tabs className={styles.reactTabsContainer}>
      <TabList className={styles.reactTabsList}>
        {sortedBillRecipients.map(billRecipient => (
          
            <Tab 
            className={styles.reactTabsTab}
            key={billRecipient.id} >{billRecipient.recipient_name[0]}</Tab>
          
          ))}
      </TabList>
        {sortedBillRecipients.map(billRecipient => (
          <TabPanel key={billRecipient.id} >
              <PersonalBill 
                  key={billRecipient.id}
                  billRecipient={billRecipient}
                  bill={props.bill}
                  updateBill={props.updateBill}
              />
          </TabPanel>
          ))}
      
    </Tabs>

  )
};

export default PeopleTabs