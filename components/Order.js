import React from 'react'
import Head from 'next/head';
import gql from 'graphql-tag';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney';
import OrderStyles from './styles/OrderStyles';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;

export default class Order extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }
  render() {
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading}) => {
          if(error) return <Error error={error} />;
          if(loading) return <p>Loading...</p>;
          const order = data.order;
          console.log('order:', order.createdAt)
          return (
            <OrderStyles>
              <Head>
                <title>Next Store - Order {order.id}</title>
              </Head>
              <p>
                <span>Order ID:</span>
                <span> {order.id}</span>
              </p>
              <p>
                <span>Charge</span>
                <span> {order.charge}</span>
              </p>
              <p>
                <span>Date</span>
                {/* https://date-fns.org/v2.16.1/docs/Getting-Started */}
                <span> {format(new Date(order.createdAt), 'MMMM d, yyyy h:mm a')}</span>
              </p>
              <p>
                <span>Order Total</span>
                <span> {formatMoney(order.total)}</span>
              </p>
              <div>
                <span>Item Count</span>
                <span> {order.items.length}</span>
                <div className="items">
                  {order.items.map(item => (
                    <div className="order-item" key={item.id}>
                      <img src={item.image} alt={item.title} />
                      <div className="item-details">
                        <h2>{item.title}</h2>
                        <p>QTY: {item.quantity}</p>
                        <p>Each: {formatMoney(item.price)}</p>
                        <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </OrderStyles>
          );
        }}
      </Query>
    )
  }
}
