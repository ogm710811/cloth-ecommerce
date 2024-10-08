import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { setCategories } from '../../store/categories/categories.actions';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoryArray = async () => {
      const categoryArray = await getCategoriesAndDocuments();
      dispatch(setCategories(categoryArray));
    };
    getCategoryArray();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
      <Route path="/:category" element={<Category/>}/>
    </Routes>
  );
};

export default Shop;
