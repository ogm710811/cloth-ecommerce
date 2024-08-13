import './category-preview.styles.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCategoriesIsLoading } from '../../store/categories/categories.selector';
import ProductCard from '../product-card/product-card.component';
import Spinner from '../spinner/spinner.component';

const CategoryPreview = ({title, products}) => {
  const categoriesIsLoading = useSelector(selectCategoriesIsLoading);

  return (
    <div className="category-preview-container">
      <h2><Link className="title" to={title}>{title.toUpperCase()}</Link></h2>
      {
        categoriesIsLoading ? (<Spinner/>) : (
          <div className="preview">
            {
              products
                .filter((_, index) => index < 4)
                .map(product => (
                  <ProductCard key={product.id} product={product}/>
                ))
            }
          </div>)
      }
    </div>
  );
};

export default CategoryPreview;