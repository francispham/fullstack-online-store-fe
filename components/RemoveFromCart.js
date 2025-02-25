import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromCart extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };
  // This gets called as soon as we get a Response back from the
  // Server after a Mutation has been Performed
  update = (cache, payload) => {
    // 1. First Read the Cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    // console.log('data:', data)
    // 2. Remove that Item from the Cache
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(
      cartItem => cartItem.id !== cartItemId
    );
    // 3. Write it back to the Cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };

  render() {
    return (
      <Mutation 
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          removeFromCart: {
            __typename: 'CartItem',
            id: this.props.id,
          },
        }}
      >
        {(RemoveFromCart, { loading }) => (
          <BigButton
            disabled={loading}
            title="Delete Item"
            onClick={() => {
              RemoveFromCart().catch(err => alert(err.message));
            }}
          >&times;</BigButton>
        )}
      </Mutation>
    ) 
  };
};

export default RemoveFromCart;