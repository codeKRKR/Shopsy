import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, limit, skip, search }) => {
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    
    if (category && category !== 'all') {
      url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
    }

    if (search) {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
    }

    const response = await axios.get(url);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    total: 0,
    limit: 10,
    skip: 0,
    hasMore: true,
    search: '',
  },
  reducers: {
    resetProducts(state) {
      state.items = [];
      state.status = 'idle';
      state.error = null;
      state.total = 0;
      state.skip = 0;
      state.hasMore = true;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [...state.items, ...action.payload.products];
        state.total = action.payload.total;
        state.skip += state.limit;
        if (state.items.length >= state.total) {
          state.hasMore = false;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetProducts, setSearch } = productsSlice.actions;

export default productsSlice.reducer;
