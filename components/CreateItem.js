import React, { Component } from 'react'

import Form from './styles/Form';

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
      <Form onSubmit={e => {
        e.preventDefault();
        console.log(this.state);
      }}>
        <fieldset>
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
    )
  }
};
