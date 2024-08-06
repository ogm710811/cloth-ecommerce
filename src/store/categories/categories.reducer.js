import { CATEGORIES_ACTION_TYPES } from './categories.types';

const INITIAL_CATEGORIES_STATE = {
  categoriesMap: {}
};

export const categoriesReducer = (
  state = INITIAL_CATEGORIES_STATE,
  action = {}) => {

  switch (action.type) {
  case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
    return {...state, categoriesMap: action.payload};
  default:
    return state;
  }
};