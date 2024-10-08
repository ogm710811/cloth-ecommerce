import { CART_ACTION_TYPES } from './cart.types';

const INITIAL_CART_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = INITIAL_CART_STATE, action = {}) => {
  switch (action.type) {
  case CART_ACTION_TYPES.SET_CART_ITEMS:
    return {
      ...state,
      cartItems: action.payload,
    };
  case CART_ACTION_TYPES.SET_IS_CART_OPEN:
    return {
      ...state,
      isCartOpen: action.payload
    };
  default:
    return state;
  }
};