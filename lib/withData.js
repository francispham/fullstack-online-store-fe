import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';

import { endpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/Cart';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    // Setup Local Data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variable, { cache }) {
            // Read the cartOpen value from the cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            console.log('cartOpen:', cartOpen);
            // Write the Cart State to the Opposite
            const data = {
              data: { cartOpen: !cartOpen },
            };
            cache.writeData(data);
            return data;
          }
        },
      },
      defaults: {
        cartOpen: true,
      },
    },
  });
}

export default withApollo(createClient);
