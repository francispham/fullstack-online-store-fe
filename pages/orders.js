import OrderList from '../components/OrderList';
import PleaseSignin from '../components/PleaseSignin';

const OrderListPage = props => {
  return (
    <div>
      <PleaseSignin>
        <OrderList />
      </PleaseSignin>
    </div>
  )
}

export default OrderListPage;
