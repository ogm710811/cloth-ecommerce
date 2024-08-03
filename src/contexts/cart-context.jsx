import { createContext, useEffect, useState } from 'react';

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

const removeCartItem = (cartItems, productToRemove) => {
  const updatedCartItems = [...cartItems];
  const existingIndex = updatedCartItems.findIndex((item) => item.id === productToRemove.id);
  if (existingIndex !== -1) {
    updatedCartItems[existingIndex].quantity -= 1;

    if (updatedCartItems[existingIndex].quantity === 0) {
      updatedCartItems.splice(existingIndex, 1);
    }
  }
  return updatedCartItems;
}

const clearCartItem = (cartItems, cartItemToClear) => {
  const updatedCartItems = [...cartItems];
  const existingIndex = updatedCartItems.findIndex((item) => item.id === cartItemToClear.id);
  if (existingIndex !== -1) {
    updatedCartItems.splice(existingIndex, 1);
  }
  return updatedCartItems;
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  itemCount: 0,
  totalCartPrice: 0,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {}
});


export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  useEffect(() => {
    const updatedItemCount = cartItems.reduce((acc, currentValue) => {
      return acc + currentValue.quantity;
    }, 0)
    setItemCount(updatedItemCount);
  }, [cartItems]);

  useEffect(() => {
    const updatedCartPrice = cartItems.reduce((acc, currentValue) => {
      return acc + (currentValue.quantity * currentValue.price);
    }, 0)
    setTotalCartPrice(updatedCartPrice);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  }

  const clearItemFromCart = (productToRemove) => {
    setCartItems(clearCartItem(cartItems, productToRemove));
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    itemCount,
    totalCartPrice,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}