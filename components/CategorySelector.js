import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, setSelectedCategory } from '../store/categoriesSlice';
import { useEffect } from 'react';

const CategoryDropdown = () => {
  const dispatch = useDispatch();
  const { list: categories = [], status, error, selectedCategory } = useSelector((state) => state.categories);

 
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (event) => {
    dispatch(setSelectedCategory(event.target.value));
  };

  // if (status === 'loading') return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="categorySelector categoryList">
      <select style={{height:"30.2px", marginRight:'1rem', borderRadius:'5px'}} value={selectedCategory} onChange={handleCategoryChange}>
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
