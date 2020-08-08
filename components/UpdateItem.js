import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION (
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    updateItem (
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
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

  render() {
    const {
      title,
      image,
      price,
      description,
    } = this.state;

    return (
      <Mutation 
        mutation={UPDATE_ITEM_MUTATION}
        variables={this.state}
      >
        {(updateItem, { loading, error }) => (
          <Form onSubmit={ async e => {
            e.preventDefault();
            // Call the Mutation
            const res = await updateItem();
            // Change them to the Single Item Page
            Router.push({
              pathname: '/item',
              query: { id: res.data.updateItem.id },
            })
            
          }}>
            <Error error={error} />
            <fieldset disable={loading.toString()} aria-busy={loading}>

              <label htmlFor="title">
                Title
                <input 
                  value={title}
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
                  value={price}
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
                  value={description}
                  placeholder="Enter A Description" 
                  name="description" 
                  id="description" 
                  required
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
};

export { UPDATE_ITEM_MUTATION };