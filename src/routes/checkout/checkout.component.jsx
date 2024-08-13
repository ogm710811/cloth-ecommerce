import './checkout.styles.scss';
import { useSelector } from 'react-redux';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { selectCartItems, selectCartTotalPrice } from '../../store/cart/cart.selector';

const Checkout = () => {
  // const {cartItems, totalCartPrice} = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const totalCartPrice = useSelector(selectCartTotalPrice);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="column-header">
          <span>Product</span>
        </div>
        <div className="column-header">
          <span>Description</span>
        </div>
        <div className="column-header">
          <span>Quantity</span>
        </div>
        <div className="column-header">
          <span>Price</span>
        </div>
        <div className="column-header">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((item) => {
        return (
          <CheckoutItem key={item.id} product={item}/>
        );
      })}
      <span className="total">Total: $ {totalCartPrice}</span>
    </div>

  );
};

export default Checkout;