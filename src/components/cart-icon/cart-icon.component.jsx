import './cart-icon.styles.scss';
import {ReactComponent as ShoppingCartIcon} from "../../assets/shopping-bag.svg";
import {CartContext} from "../../contexts/cart-context";
import {useContext} from "react";

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, itemCount} = useContext(CartContext);

    const isCartOpenToggleHandler = () => {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <div className="cart-icon-container" onClick={isCartOpenToggleHandler}>
           <ShoppingCartIcon className="shopping-icon" />
           <span className="item-count">{itemCount}</span>
        </div>
    )
}

export default CartIcon;