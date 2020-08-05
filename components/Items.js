import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

export default class Items extends Component {
  render() {
    return (
      <div>
        <p>This is ITEMS</p>
        <Query query={ALL_ITEMS_QUERY}>
          {({data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return <p>Data: {data.items.length}</p>;
          }}
        </Query>
      </div>
    )
  }
}
