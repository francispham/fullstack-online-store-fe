import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

export default class DeleteItem extends Component {
  update = (cache, payload) => {
    // Manually Update the Cache on the Client, so it matches the Server
    // 1. Read the Cache for the Items wanted
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    console.log('data:', data)
    // 2. Filter the Deleted Item out of the Page
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    // 3. Put the Remain Items back
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data }) 
  };
  
  render() {
    return (
      <Mutation 
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update= {this.update}
      >
        {(deleteItem, { error }) => (
          <button onClick={() => {
            if (confirm('Are You Sure You Want to DELETE this Item?')) {
              deleteItem().catch(err => {
                alert(err.message);
              });
            }
          }}>
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  };
};
