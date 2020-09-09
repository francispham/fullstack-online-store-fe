import Order from '../components/Order';
import PleaseSignin from '../components/PleaseSignin';

const OrderPage = props => {
  return (
    <div>
      <PleaseSignin>
        <Order id={props.query.id} ></Order>
      </PleaseSignin>
    </div>
  )
}

export default OrderPage;
