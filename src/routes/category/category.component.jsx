import './category.styles.scss';
import { Fragment, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories-context';


const Category = () => {
  const {category} = useParams();
  const {categoriesMap} = useContext(CategoriesContext);

  // Memoization for performance
  // Using useMemo around itemsInCategory ensures that the variable is only recalculated when categoriesMap or category
  // changes, thus preventing unnecessary re-renders.
  const itemsInCategory = useMemo(() => categoriesMap[category], [categoriesMap, category]);
  console.log(itemsInCategory);

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