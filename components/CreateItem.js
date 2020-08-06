import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION (
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem (
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

export default class CreateItem extends Component {
  state = {
    title: 'This is My TITLE',
    description: 'Hello me hi hi hi adfafasfasfafsdfafa',
    image: '',
    largeImage: '',
    price: 999,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    // console.log('value:', value)
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val })
  };

  render() {
    return (
      <Mutation 
        mutation={CREATE_ITEM_MUTATION}
        variables={this.state}
      >
        {(createItem, { loading, error }) => (
          <Form onSubmit={ async e => {
            e.preventDefault();
            // Call the Mutation
            const res = await createItem();
            console.log('res:', res)
          }}>
            <Error error={error} />
            <fieldset disable={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input 
                  value={this.state.title}
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
                  value={this.state.price}
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
                  value={this.state.description}
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

export { CREATE_ITEM_MUTATION };