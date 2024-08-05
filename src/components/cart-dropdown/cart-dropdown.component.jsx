import './cart-dropdown.styles.scss';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart-context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
  const [isDisplay, setIsDisplay] = useState(true);

  const {cartItems} = useContext(CartContext);
  const navigate = useNavigate();

  const dropdownContainerHandler = () => {
    setIsDisplay(!isDisplay);
  };

  const navigationHandler = () => {
    navigate('/checkout');
    dropdownContainerHandler();
  };

  return (
    <div className={`cart-dropdown-container ${isDisplay ? 'd-block' : 'd-none'}`}>
      <div className="cart-items">
        {
          cartItems && cartItems.map(item =>
            <CartItem key={item.id} cartItem={item} />
          )
        }
      </div>
      <Button onClick={navigationHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;