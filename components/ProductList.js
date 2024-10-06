import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, resetProducts } from '../store/productsSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status, error, hasMore, limit, skip, search } = useSelector((state) => state.products);
  const { selectedCategory } = useSelector((state) => state.categories);
  const observer = useRef();

  const lastProductElementRef = useCallback(node => {
    if (status === 'loading') return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        dispatch(fetchProducts({ 
          category: selectedCategory || 'all',
          limit, 
          skip, 
          search 
        }));
      }
    });
    if (node) observer.current.observe(node);
  }, [status, hasMore, dispatch, selectedCategory, limit, skip, search]);

  useEffect(() => {
    dispatch(resetProducts());
    dispatch(fetchProducts({ 
      category: selectedCategory || 'all',
      limit, 
      skip: 0,
      search 
    }));
  }, [dispatch, selectedCategory, limit, search]);

  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="product-list">
      {items.map((product, index) => {
        if (items.length === index + 1) {
          return (
            <div ref={lastProductElementRef} key={product.id} className="product-card card">
                <img src={product.image} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="btn btn-primary"><strong>Price:</strong> ${product.price}</p>
                </div>
            </div>
          );
        } else {
          return (
            <div key={product.id} className="product-card card">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="btn btn-primary"><strong>Price:</strong> ${product.price}</p>
              </div>
          </div>
          );
        }
      })}
      {status === 'loading' && <p>Loading more products...</p>}
      {!hasMore && <p>No more products.</p>}
    </div>
  );
  
};

export default ProductList;
