import React from 'react';
import ShareIcon from '@material-ui/icons/Share';

const ShareBill = (props) => {
    const billRecipient = props.billRecipient

    // let itemsText = person['items'].map(item => `${item.name}($${item.price * item.qty})`).join(", ")
    let itemsText = billRecipient.bill_items.map(billItem => `${billItem.item_name}($${billItem.price * billItem.quantity})`).join("\n")
    let textBox = `Hey ${billRecipient.recipient_name}, your breakdown for the bill is:\n${itemsText}\nTotal after tax and tip is $${Math.round(100*(billRecipient.total_owes))/100}`
    // let textBox = `Hey ${person.name}, your breakdown for the bill is: ${itemsText}; total after tax and tip is $${props.person.total}`

    const handleOnClick = () => {
        console.log(textBox)
        if (navigator.share) {
          navigator
            .share({
              title: `${billRecipient.recipient_name} bill`,
              text: textBox,
              url: "venmo://pay?recipients",
            })
            .then(() => {
              console.log('Successfully shared');
            })
            .catch(error => {
              console.error('Something went wrong sharing the bill', error);
            });
        }
      };

  return (
    <div onClick={handleOnClick}>
      <ShareIcon />
    </div>
  );
};

export default ShareBill;