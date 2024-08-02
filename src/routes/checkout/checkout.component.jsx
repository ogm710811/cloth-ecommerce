import './checkout.styles.scss';
import { useContext } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CartContext } from '../../contexts/cart-context';

const Checkout = () => {
  const {cartItems, totalCartPrice} = useContext(CartContext);

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='column-header'>
          <span>Product</span>
        </div>
        <div className='column-header'>
          <span>Description</span>
        </div>
        <div className='column-header'>
          <span>Quantity</span>
        </div>
        <div className='column-header'>
          <span>Price</span>
        </div>
        <div className='column-header'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((item) => {
        return (
          <CheckoutItem key={item.id} cartItem={item} />
        )
      })}
      <span className='total'>Total: $ {totalCartPrice}</span>
    </div>

  )
}

export default Checkout;