import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Error from './ErrorMessage';

const ALL_USER_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = props => (
  <Query query={ALL_USER_QUERY}>
    {({ data, loading, error }) => (
      console.log('data:', data) ||
      <div>
        <Error error={error} />
        <div>
          <h2>Manage Permissions</h2>
        </div>
      </div>
    )}
  </Query>
);

export default Permissions;