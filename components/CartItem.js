import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import formatMoney from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li`
  display: grid;
  padding: 1rem 0;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  border-bottom: 1px solid ${props => props.theme.lightgrey};

  img {
    margin-right: 10px;
  }
  h3, p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => {
  // 1. Check if that Item exists
  if (!cartItem.item) return (
    <CartItemStyles>
      This Item has been REMOVE
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
  
  return (
    <CartItemStyles>
      <img width="100" src={cartItem.item.image} alt={cartItem.item.title} />
      <div className="cart-item-details">
        <h3>{cartItem.item.title}</h3>
        <p>
          {formatMoney(cartItem.item.price * cartItem.quantity)}{' - '}
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartItem;