import './product-card.styles.scss'
import Button from "../button/button.component";
import {CartContext} from "../../contexts/cart-context";
import {useContext} from "react";

const ProductCard = ({product}) => {
    const {name, imageUrl, price} = product;
    const {addItemToCart} = useContext(CartContext);

    const addProductToCart = () => {
        addItemToCart(product);
    };

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={name} />
            <div className="footer">
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button
                buttonStyle='inverted'
                onClick={addProductToCart}
                >Add to cart
            </Button>
        </div>
    )
}

export default ProductCard;