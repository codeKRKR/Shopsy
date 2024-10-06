import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import categoriesReducer from './categoriesSlice';
import productsReducer from './productsSlice';

const makeStore = () => {
  return configureStore({
    reducer: {
      categories: categoriesReducer,
      products: productsReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export const wrapper = createWrapper(makeStore);
