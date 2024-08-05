import './category-item.styles.scss';

const CategoryItem = ({imageUrl, title}) => (
  <div className="category-item-container">
    <div className="background-image" style={{backgroundImage: `url(${imageUrl})`}}></div>
    <div className="category-body-container">
      <h2>{title}</h2>
      <p>Shop now</p>
    </div>
  </div>
);

export default CategoryItem;