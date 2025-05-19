import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import items from '../../mockData/items.json';

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return items;
    } catch (error) {
      return rejectWithValue('Failed to fetch products');
    }
  }
);

const initialState = {
  items: [],
  filteredItems: [],
  selectedCategory: 'All',
  sortBy: 'featured',
  priceRange: { min: '', max: '' },
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredItems = filterAndSortProducts(state);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.filteredItems = filterAndSortProducts(state);
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
      state.filteredItems = filterAndSortProducts(state);
    },
    searchProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      if (!searchTerm) {
        state.filteredItems = filterAndSortProducts(state);
        return;
      }
      state.filteredItems = state.items.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.brand.toLowerCase().includes(searchTerm)
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = filterAndSortProducts(state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Helper function to filter and sort products
const filterAndSortProducts = (state) => {
  let filtered = [...state.items];

  // Apply category filter
  if (state.selectedCategory !== 'All') {
    filtered = filtered.filter(item => item.category === state.selectedCategory);
  }

  // Apply price range filter
  if (state.priceRange.min !== '') {
    filtered = filtered.filter(item => item.price >= Number(state.priceRange.min));
  }
  if (state.priceRange.max !== '') {
    filtered = filtered.filter(item => item.price <= Number(state.priceRange.max));
  }

  // Apply sorting
  switch (state.sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    default: // 'featured'
      // Keep original order
      break;
  }

  return filtered;
};

export const { setSelectedCategory, setSortBy, setPriceRange, searchProducts } = productSlice.actions;
export default productSlice.reducer; 