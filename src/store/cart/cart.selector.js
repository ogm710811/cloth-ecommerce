import { createSelector } from 'reselect';

export const selectCartReducer = (state) => {
  return state.cart;
};

export const selectCartItems
  = createSelector([selectCartReducer], (cartState) => {
    return cartState.cartItems;
  });

export const selectIsCartOpen
  = createSelector([selectCartReducer], (cartState) => {
    return cartState.isCartOpen;
  });

export const selectCartCount
  = createSelector([selectCartItems], (cartItems) => {
    return cartItems.reduce((acc, currentValue) => {
      return acc + currentValue.quantity;
    }, 0);
  });

export const selectCartTotalPrice
  = createSelector([selectCartItems], (cartItems) => {
    return cartItems.reduce((acc, currentValue) => {
      return acc + (currentValue.quantity * currentValue.price);
    }, 0);
  });
