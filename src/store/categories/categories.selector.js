import { createSelector } from 'reselect';

const selectCategoriesReducer = (state) => {
  console.log('selector 1 fired');
  return state.categories;
};

export const selectCategoriesSelector = createSelector([selectCategoriesReducer], (categoriesState) => {
  console.log('selector 2 fired');
  return categoriesState.categories;
});

export const selectCategoriesMap = createSelector([selectCategoriesSelector], (categories) => {
  console.log('selector 3 fired');
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