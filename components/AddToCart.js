import React from 'react';

class AddToCart extends React.Component {
  render() {
    const { id } = this.props;
    return <button>Add This To Cart</button>;
  };
};

export default AddToCart;