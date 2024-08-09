import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

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

export const setCartItems = (cartItems) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);


export const setIsCartOpen = (isCartOpen) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = clearCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};