import React from 'react';
import ShareIcon from '@material-ui/icons/Share';

const ShareBill = (props) => {
    const person = props.person

    let itemsText = person['items'].map(item => `${item.name}($${item.price * item.qty})`).join(", ")
    let textBox = `Hey ${person.name}, your breakdown for the bill is: ${itemsText}; total after tax and tip is $${props.person.total}`

    const handleOnClick = () => {
        console.log(textBox)
        if (navigator.share) {
          navigator
            .share({
              title: `${person.name} bill`,
              text: textBox,
              url: "venmo://",
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