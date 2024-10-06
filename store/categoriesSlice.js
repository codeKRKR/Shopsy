import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await fetch('https://dummyjson.com/products/categories');
  
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const responseText = await response.text();
  
  if (!responseText) {
    throw new Error('Empty response from the server');
  }

  try {
    const data = JSON.parse(responseText);
    return data;
  } catch (error) {
    throw new Error('Invalid JSON response');
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    selectedCategory: 'all',
  },
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
