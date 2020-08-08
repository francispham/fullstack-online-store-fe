import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY =  gql`
  query SINGLE_ITEM_QUERY ($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION (
    $title: String!
    $description: String!
    $price: Int!
  ) {
    updateItem (
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

export default class UpdateItem extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    // console.log('value:', value)
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val })
  };

  updateItem = (e, updateItemMutation) => {
    e.preventDefault();
    console.log('Updating Item!!!!')
    console.log(this.state);
  }

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No Item Found!for ID: {this.props.id}</p>;
          const {
            title,
            price,
            description,
          } = data.item;
          return (
            <Mutation
              mutation={UPDATE_ITEM_MUTATION}
              variables={this.state}
            >
              {(updateItem, { loading, error }) => (
                <Form onSubmit={e => this.updateItem(e, updateItem)}>
                  <Error error={error} />
                  <fieldset disable={loading.toString()} aria-busy={loading}>

                    <label htmlFor="title">
                      Title
                      <input 
                        defaultValue={title}
                        placeholder="Title" 
                        name="title" 
                        type="text" 
                        id="title" 
                        required
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="price">
                      Price
                      <input 
                        defaultValue={price}
                        placeholder="Price" 
                        name="price" 
                        type="number" 
                        id="price" 
                        required
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="description">
                      Description
                      <textarea 
                        defaultValue={description}
                        placeholder="Enter A Description" 
                        name="description" 
                        id="description" 
                        required
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">Save Changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          )
        }}
      </Query>
    );
  };
};

export { UPDATE_ITEM_MUTATION };