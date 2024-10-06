import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, resetProducts, fetchProducts } from '../store/productsSlice';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { search } = useSelector((state) => state.products);
  const { selectedCategory } = useSelector((state) => state.categories);
  const [input, setInput] = useState(search);

  useEffect(() => {
    setInput(search);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearch(input));
    dispatch(resetProducts());

    router.push({
      pathname: '/',
      query: { 
        ...router.query, 
        search: input || undefined,
        category: selectedCategory || undefined,
      },
    }, undefined, { shallow: true });

    dispatch(fetchProducts({ 
      category: selectedCategory || 'all', 
      limit: 10, 
      skip: 0, 
      search: input 
    }));
  };

  return (
    

    <form onSubmit={handleSearch} style={{ marginTop: '20px', display:'flex', justifyContent:'center', alignItems:'center'}} className="Searchbar d-flex" role="search">
        <input onChange={(e) => setInput(e.target.value)} value={input} className="input form-control me-2" type="text" placeholder="Search products..." aria-label="Search"/>
        <button style={{marginRight:'1rem', marginBottom:'1rem', height:'2.9rem', borderRadius:'5px'}} className="btn" type="submit">Search</button>
      </form>

  );
};

export default SearchBar;