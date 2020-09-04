import React from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';

import { DropDown, SearchStyles } from './styles/DropDown';

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(where: { OR: [
      { title_contains: $searchTerm },
      { description_contains: $searchTerm },
    ]}) {
      id
      image
      title
    }
  }
`;

class AutoComplete extends React.Component {
  onChange = async (e, client) => {
    // Manually Query Apollo Client
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value },
    })
    console.log('Response:', res)
  }
  
  render() {
    return (
      <SearchStyles>
        <div>
          <ApolloConsumer>
            {client => <input type="search" onChange={e => {
              e.persist();
              this.onChange(e, client);
            }} />}
          </ApolloConsumer>
          <DropDown>
            <p>Items will go here</p>
          </DropDown>
        </div>
      </SearchStyles>
    );
  };
};

export default AutoComplete;