import Link from 'next/link';
import { Mutation } from 'react-apollo';

import NavStyles from './styles/NavStyles';

import User from './User';
import Signout from './Signout';
import CartCount from './CartCount';
import { TOGGLE_CART_MUTATION } from './Cart';
import CartItem from './CartItem';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {me ? (
          <>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/me">
              <a>Account</a>
            </Link>
            <Signout />
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {
                toggleCart => (
                  <button onClick={toggleCart}>
                    My Cart
                    <CartCount 
                      count={me.cart.reduce((tally, CartItem) => 
                        tally + CartItem.quantity, 0
                      )}
                    ></CartCount>
                  </button>
                )
              }
            </Mutation>
          </>
        ) : (
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;