import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import Error from './ErrorMessage';

const SingleItemStyles = styled.div`
  display: grid;
  max-width: 1200px;
  margin: 2rem auto;
  min-height: 800px;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  box-shadow: ${props => props.theme.bs};
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY ($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

export default class SingleItem extends Component {
  render() {
    const { id } = this.props;
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No Item Found</p>;
          const { largeImage, title, description } = data.item;
          
          return (
            <SingleItemStyles>
              <img src={largeImage} alt={title} />
              <div className="details">
                <h2>Viewing {title}</h2>
                <p>{description}</p>
              </div>
            </SingleItemStyles>
          );
        }}
      </Query>
    )
  }
}
