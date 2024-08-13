import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { createAction } from '../../utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPES } from './categories.types';

const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

const fetchCategoriesSuccess = (categories) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const categoryArray = await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const categories = await getCategoriesAndDocuments();
            resolve(categories);
          } catch (error) {
            reject(error);
          }
        }, 1000);
      });
      dispatch(fetchCategoriesSuccess(categoryArray));

    } catch (e) {
      dispatch(fetchCategoriesFailed(e));
    }
  };
};




