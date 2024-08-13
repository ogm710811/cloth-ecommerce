import './cart-icon.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as ShoppingCartIcon } from '../../assets/shopping-bag.svg';
import { setIsCartOpen } from '../../store/cart/cart.actions';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';

const CartIcon = () => {
  // const {isCartOpen, setIsCartOpen, itemCount} = useContext(CartContext);
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const itemCount = useSelector(selectCartCount);

  const isCartOpenToggleHandler = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <div className="cart-icon-container" onClick={isCartOpenToggleHandler}>
      <ShoppingCartIcon className="shopping-icon"/>
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;