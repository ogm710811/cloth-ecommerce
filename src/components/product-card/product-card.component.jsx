import './product-card.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../button/button.component';

const ProductCard = ({product}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const {name, imageUrl, price} = product;
  // const {addItemToCart} = useContext(CartContext);

  const addProductToCart = () => {
    console.log('ProductCard ::', cartItems);
    dispatch(addItemToCart(cartItems, product));
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name}/>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonStyle="inverted"
        onClick={addProductToCart}
      >Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;