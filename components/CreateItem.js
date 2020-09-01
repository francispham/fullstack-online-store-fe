import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
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
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val })
  };

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'nextjs-store');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/ddz8cmo2p/image/upload',
      { method: 'POST', body: data }
    );
    const file = await res.json();
    console.log('file:', file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    })
  }

  render() {
    const {
      title,
      image,
      price,
      description,
    } = this.state;

    return (
      <Mutation
        // refetchQueries={}
        mutation={CREATE_ITEM_MUTATION}
        variables={this.state}
      >
        {(createItem, { loading, error }) => (
          <Form onSubmit={ async e => {
            e.preventDefault();
            // Call the Mutation
            const res = await createItem();
            // Change them to the Single Item Page
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id },
            })
            
          }}>
            <Error error={error} />
            <fieldset disable={loading.toString()} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input 
                  name="file" 
                  type="file" 
                  id="file" 
                  required
                  placeholder="Upload an Image" 
                  onChange={this.uploadFile}
                />
                {image && <img src={image} width="200" alt= "Upload Preview" />}
              </label>

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

export { CREATE_ITEM_MUTATION };