import React from 'react';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import { Query, Mutation } from 'react-apollo';

import User from './User';
import CartItem from './CartItem';
import Checkout from './Checkout';

import Supreme from './styles/Supreme';
import SickButton from './styles/SickButton';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';

import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) =>  <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});

const Cart = () => (
  <Composed>
    {({ user, toggleCart, localState }) => {
      const { me } = user.data;
      const { cartOpen } = localState.data;
      if(!me) return null;
      return (
        <CartStyles open={cartOpen}>
          <header>
            <CloseButton onClick={toggleCart} title="close">&times;</CloseButton>
            <Supreme>{me.name}'s Cart</Supreme>
            <p>
              You Have {me.cart.length} Item
              {me.cart.length === 1 ? '' : 's'} in your cart.
            </p>
          </header>
          <ul>
            {me.cart.map(
              cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />
            )}
          </ul>
          {(me.cart.length > 0) ? (
            <footer>
              <p>{formatMoney(calcTotalPrice(me.cart))}</p>
                <Checkout>
                  <SickButton>Checkout</SickButton>
                </Checkout>
            </footer>
          ): null}
        </CartStyles>
      );
    }}
  </Composed>

);

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };