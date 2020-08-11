import React, { Component } from 'react'

import Form from './styles/Form';

export default class Signup extends Component {
  state = {
    email: '',
    name: '',
    password: ''
  };

  saveToState = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <Form>
        <fieldset>
          <h2>Sign Up for An Account</h2>
          <label htmlFor="email">
            Email
            <input 
              type="email" 
              name="email" 
              placeholder="email" 
              value={this.state.email}
              onChange={this.saveToState}
            />
          </label>
          <label htmlFor="name">
            Name
            <input 
              type="text" 
              name="name" 
              placeholder="name" 
              value={this.state.name}
              onChange={this.saveToState} 
            />
          </label>
          <label htmlFor="password">
            Password
            <input 
              type="password" 
              name="password" 
              placeholder="password" 
              value={this.state.password}
              onChange={this.saveToState} 
            />
          </label>

          <button type="submit">Sign Up</button>
        </fieldset>
      </Form>
    )
  }
}
