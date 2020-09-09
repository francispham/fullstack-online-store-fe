import React from 'react';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import StripeCheckout from 'react-stripe-checkout';

import NProgress from 'nprogress';
import User, { CURRENT_USER_QUERY } from './User';
import calcTotalPrice from '../lib/calcTotalPrice';

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
};

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

class Checkout extends React.Component {
  onToken = async (res, createOrder) => {
    NProgress.start();
    // Manually Call the Mutation once we have the Stripe Token
    const order = await createOrder({
      variables: {
        token: res.id
      },
    }).catch(err => {
      alert(err.message);
    });
    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id },
    })
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Mutation 
            mutation={CREATE_ORDER_MUTATION}
            refetchQueries= {[{ query: CURRENT_USER_QUERY }]}
          >
            {createOrder => (
              <StripeCheckout
                amount={calcTotalPrice(me.cart)}
                name="Next Store"
                description={`Order of ${totalItems(me.cart)} items!`}
                image={
                  me.cart.length && me.cart[0].item && 
                  me.cart[0].item.image
                } // Check & Display Image
                stripeKey="pk_test_powbTm7SuxCdQafatiw61KQm"
                email={me.email}
                currency="CAD"
                token={res => this.onToken(res, createOrder)}
              >{this.props.children}</StripeCheckout>
            )}
          </Mutation>
          
        )}
      </User>
    )
  };
};

export default Checkout;