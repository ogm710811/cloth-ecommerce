import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
  const updatedCartItems = [...cartItems];
  const existingIndex = updatedCartItems.findIndex((item) => item.id === productToAdd.id);
  if (existingIndex !== -1) {
    updatedCartItems[existingIndex].quantity += 1;
  } else {
    updatedCartItems.push({...productToAdd, quantity: 1});
  }
  return updatedCartItems;
};

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
};

const clearCartItem = (cartItems, cartItemToClear) => {
  const updatedCartItems = [...cartItems];
  const existingIndex = updatedCartItems.findIndex((item) => item.id === cartItemToClear.id);
  if (existingIndex !== -1) {
    updatedCartItems.splice(existingIndex, 1);
  }
  return updatedCartItems;
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {
  },
  cartItems: [],
  itemCount: 0,
  totalCartPrice: 0,
  addItemToCart: () => {
  },
  removeItemFromCart: () => {
  },
  clearItemFromCart: () => {
  }
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  itemCount: 0,
  totalCartPrice: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
  case CART_ACTION_TYPES.SET_CART_ITEMS:
    return {
      ...state,
      ...action.payload
    };
  case CART_ACTION_TYPES.SET_IS_CART_OPEN:
    return {
      ...state,
      isCartOpen: action.payload
    };
  default:
    throw new Error(`unhandled type of ${action.type} in cartReducer`);
  }
};

export const CartProvider = ({children}) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [itemCount, setItemCount] = useState(0);
  // const [totalCartPrice, setTotalCartPrice] = useState(0);

  const [{
    isCartOpen,
    cartItems,
    itemCount,
    totalCartPrice
  }, dispatch] = useReducer(cartReducer, INITIAL_STATE, undefined);

  // useEffect(() => {
  //   const updatedItemCount = cartItems.reduce((acc, currentValue) => {
  //     return acc + currentValue.quantity;
  //   }, 0)
  //   setItemCount(updatedItemCount);
  // }, [cartItems]);
  //
  // useEffect(() => {
  //   const updatedCartPrice = cartItems.reduce((acc, currentValue) => {
  //     return acc + (currentValue.quantity * currentValue.price);
  //   }, 0)
  //   setTotalCartPrice(updatedCartPrice);
  // }, [cartItems]);

  const setIsCartOpen = (isCartOpen) => {
    dispatch(
      createAction('SET_IS_CART_OPEN', isCartOpen)
    );
  };

  const updateCartItemsReducer = (newCartItems) => {
    const updatedItemCount = newCartItems.reduce((acc, currentValue) => {
      return acc + currentValue.quantity;
    }, 0);

    const updatedCartPrice = newCartItems.reduce((acc, currentValue) => {
      return acc + (currentValue.quantity * currentValue.price);
    }, 0);

    dispatch(
      createAction('SET_CART_ITEMS', {
        cartItems: newCartItems,
        itemCount: updatedItemCount,
        totalCartPrice: updatedCartPrice
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (productToRemove) => {
    const newCartItems = clearCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

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
};