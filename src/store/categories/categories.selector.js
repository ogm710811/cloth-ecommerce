import { createSelector } from 'reselect';

const selectCategoriesReducer = (state) => {
  return state.categories;
};

export const selectCategoriesSelector
  = createSelector([selectCategoriesReducer], (categoriesState) => {
    return categoriesState.categories;
  });

export const selectCategoriesMap
  = createSelector([selectCategoriesSelector], (categories) => {
    const categoriesMap = categories.reduce((acc, category) => {
      const {title, items} = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});

    return categoriesMap;
  });

// export const selectCategoriesMap = (state) => {
//   const categoriesMap = state.categories.categories.reduce((acc, category) => {
//     const {title, items} = category;
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});
//
//   return categoriesMap;
// };

export const selectCategoriesIsLoading
  = createSelector([selectCategoriesReducer], (categoriesState) => {
    return categoriesState.isLoading;
  });