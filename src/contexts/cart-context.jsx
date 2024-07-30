import {createContext, useEffect, useState} from "react";

const addCartItem = (cartItems, productToAdd) => {
    const updatedCartItems = [...cartItems];
    const existingIndex = updatedCartItems.findIndex((item) => item.id === productToAdd.id);
    if (existingIndex !== -1) {
        updatedCartItems[existingIndex].quantity += 1;
    } else {
        updatedCartItems.push({...productToAdd, quantity: 1});
    }
    return updatedCartItems;
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    itemCount: 0,
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const updatedItemCount = cartItems.reduce((acc, currentValue) => {
            return acc + currentValue.quantity;
        }, 0)
        setItemCount(updatedItemCount)
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, itemCount};
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}