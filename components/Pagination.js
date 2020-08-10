import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import PaginationStyles from './styles/PaginationStyles';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <PaginationStyles>
    <Query query={PAGINATION_QUERY} >
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        const { count } = data.itemsConnection.aggregate;
        return <p>{count}</p>;
        
      }}
    </Query>
  </PaginationStyles>
);

export default Pagination;

