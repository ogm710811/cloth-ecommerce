import './checkout-item.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({product}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const {name, imageUrl, price, quantity} = product;
  // const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

  const clearItemFromCartHandler = () => {
    dispatch(clearItemFromCart(cartItems, product));
  };

  const addItemHandler = () => {
    dispatch(addItemToCart(cartItems, product));
  };

  const removeItemHandler = () => {
    dispatch(removeItemFromCart(cartItems, product));
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img className="image" src={imageUrl} alt={name}/>
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>&#10095;</div>
      </span>
      <span className="price">${price}</span>
      <span className="remove-button" onClick={clearItemFromCartHandler}>&#10005;</span>
    </div>
  );
};

export default CheckoutItem;