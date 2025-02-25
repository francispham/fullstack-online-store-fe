import React from 'react';
import gql from 'graphql-tag';
import Router from 'next/router';
import debounce from 'lodash.debounce';
import Downshift, { resetIdCounter } from 'downshift';
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

function routeToItem(item) {
  Router.push({
    pathname: '/item',
    query: {
      id: item.id,
    },
  });
};

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
    resetIdCounter(); // For Solving: "Prop `aria-labelledby` did not match"
    return (
      <SearchStyles>
        <Downshift 
          onChange={routeToItem}
          itemToString={item => (item === null ? '' : item.title)}
        >
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
            <div>
              <ApolloConsumer>
                {client => <input 
                  {...getInputProps({
                    id: 'search',
                    type: 'search',
                    placeholder: 'Search For An Item',
                    className: this.state.loading ? 'loading' : '',
                    onChange: e => {
                    e.persist(); // Keep Values after Debouncing
                    this.onChange(e, client);
                    },
                  })}
                />}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {this.state.items.map((item, index) => (
                    <DropDownItem 
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      <img src={item.image} width="50" alt={item.title} />
                      {item.title}
                    </DropDownItem>
                  ))}
                  {!this.state.items.length && !this.state.loading && (
                    <DropDownItem>Nothing Found {inputValue}</DropDownItem>
                  )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  };
};

export default AutoComplete;