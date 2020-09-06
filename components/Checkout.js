import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import User from './User';
import calcTotalPrice from '../lib/calcTotalPrice';

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
};

class Checkout extends React.Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <StripeCheckout
            amount={calcTotalPrice(me.cart)}
            name="Next Store"
            description={`Order of ${totalItems(me.cart)} items!`}
            image={me.cart[0].item && me.cart[0].item.image} // Check & Display Image
            stripeKey="pk_test_powbTm7SuxCdQafatiw61KQm"
            currency="CAN"
            email={me.email}
          >{this.props.children}</StripeCheckout>
        )}
      </User>
    )
  };
};

export default Checkout;