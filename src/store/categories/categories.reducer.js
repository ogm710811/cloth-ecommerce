import { CATEGORIES_ACTION_TYPES } from './categories.types';

const INITIAL_CATEGORIES_STATE = {
  categories: []
};

export const categoriesReducer = (
  state = INITIAL_CATEGORIES_STATE,
  action = {}) => {
  
  switch (action.type) {
  case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
    return {...state, categories: action.payload};
  default:
    return state;
  }
};