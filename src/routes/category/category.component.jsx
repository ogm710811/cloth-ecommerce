import './category.styles.scss';
import { Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap } from '../../store/categories/categories.selector';


const Category = () => {
  const {category} = useParams();
  const {categoriesMap} = useSelector(selectCategoriesMap);

  // Memoization for performance
  // Using useMemo around itemsInCategory ensures that the variable is only recalculated when categoriesMap or category
  // changes, thus preventing unnecessary re-renders.
  const itemsInCategory = useMemo(() => categoriesMap[category], [categoriesMap, category]);

  return (
    <Fragment>
      <h2 className="title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {itemsInCategory && itemsInCategory.map(item => (
          <ProductCard key={item.id} product={item}/>
        ))}
      </div>
    </Fragment>
  );
};

export default Category;