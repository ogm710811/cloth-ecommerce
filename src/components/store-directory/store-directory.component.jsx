import './store-directory.styles.scss';
import CategoryItem from '../category-item/category-item.component';

const StoreDirectory = ({categories}) => (
  <div className='store-container'>
    {categories.map(({id, title, imageUrl}) => (
      <CategoryItem key={id} title={title} imageUrl={imageUrl}/>
    ))}
  </div>
)

export default StoreDirectory;