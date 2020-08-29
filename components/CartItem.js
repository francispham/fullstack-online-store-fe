import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CartItemStyles = styled.li``;

const CartItem = props => <CartItemStyles>{props.cartItem.id}</CartItemStyles>;

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartItem;