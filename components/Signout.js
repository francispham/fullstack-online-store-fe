import React from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = () => (
  <Mutation 
    mutation={SIGN_OUT_MUTATION} 
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signout => <a onClick={signout}>sign out</a>}
  </Mutation>
);

export default Signout;