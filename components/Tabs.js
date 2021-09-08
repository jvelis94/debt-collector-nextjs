

import dynamic from 'next/dynamic'
const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), { ssr: false }) // disable ssr
import { Tab, TabList, TabPanel } from 'react-tabs'
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PersonalBill from './PersonalBill';

const PeopleTabs = (props) => (
  <Tabs>
    <TabList>
      {props.bill.bill_recipients.map(billRecipient => (
        <Tab key={billRecipient.id}>{billRecipient.recipient_name}</Tab>
        ))}
    </TabList>
    {props.bill.bill_recipients.map(billRecipient => (
        <TabPanel key={billRecipient.id}>
            <PersonalBill 
                key={billRecipient.id} 
                billRecipient={billRecipient} 
                addItemToPerson={props.addItemToPerson}
                incrementItemQuantity={props.incrementItemQuantity}
                decrementItemQuantity={props.decrementItemQuantity}
                removeItemFromPerson={props.removeItemFromPerson}
                eliminateTax={props.eliminateTax}
                addTax={props.addTax}
                updateBillRecipients={props.updateBillRecipients}
                bill={props.bill}
                updateBill={props.updateBill}
            />
        </TabPanel>
        ))}
    
  </Tabs>
);

export default PeopleTabs