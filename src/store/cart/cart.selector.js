import { createSelector } from 'reselect';

export const selectCartReducer = (state) => {
  console.log('selector 1 fired');
  return state.cart;
};

export const selectCartItems
  = createSelector([selectCartReducer], (cartState) => {
    console.log('selector 2 fired');
    console.log('selectCartItems ::', cartState);
    return cartState.cartItems;
  });

export const selectIsCartOpen
  = createSelector([selectCartReducer], (cartState) => {
    console.log('selector 3 fired');
    return cartState.isCartOpen;
  });

export const selectCartCount
  = createSelector([selectCartItems], (cartItems) => {
    console.log('selector 4 fired');
    return cartItems.reduce((acc, currentValue) => {
      return acc + currentValue.quantity;
    }, 0);
  });

export const selectCartTotalPrice
  = createSelector([selectCartItems], (cartItems) => {
    console.log('selector 5 fired');
    return cartItems.reduce((acc, currentValue) => {
      return acc + (currentValue.quantity * currentValue.price);
    }, 0);
  });