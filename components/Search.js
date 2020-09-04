import React from 'react';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { ApolloConsumer } from 'react-apollo';

import { DropDown, SearchStyles, DropDownItem } from './styles/DropDown';

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
  state ={
    items: [],
    loading: false,
  };

  onChange = debounce(async (e, client) => {
    // Manually Query Apollo Client
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value },
    });
    this.setState({
      items: res.data.items,
      loading: false,
    }); 
  }, 350); // debounce will Delay this Function to Run after 350 Seconds
  
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
            {this.state.items.map(item => (
              <DropDownItem key={item.id}>
                <img src={item.image} width="50" alt={item.title} />
                {item.title}
              </DropDownItem>
            ))}
          </DropDown>
        </div>
      </SearchStyles>
    );
  };
};

export default AutoComplete;