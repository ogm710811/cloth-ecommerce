import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';

const CheckoutItem = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const {removeProductFromCart} = useContext(CartContext);

  const removeProductHandler = () => {
    removeProductFromCart(cartItem);
  }

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img className='image' src={imageUrl} alt={name}/>
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>{quantity}</span>
      <span className='price'>${price}</span>
      <span className='remove-button' onClick={removeProductHandler}>&#10005;</span>
    </div>
  );
}

export default CheckoutItem;