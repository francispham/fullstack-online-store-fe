import React from 'react'
import PropTypes from 'prop-types';

export default class Order extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }
  render() {
    return (
      <div>
        <p>Order ID: {this.props.id}</p>
      </div>
    )
  }
}
