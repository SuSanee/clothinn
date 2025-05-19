import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, setSortBy, setPriceRange } from '../../store/slices/productSlice';

const FiltersContainer = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FilterGroup = styled.div`
  margin-bottom: 1rem;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const PriceRange = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const PriceInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ProductFilters = () => {
  const dispatch = useDispatch();
  const { selectedCategory, sortBy, priceRange } = useSelector((state) => state.product);
  const [minPrice, setMinPrice] = useState(priceRange.min);
  const [maxPrice, setMaxPrice] = useState(priceRange.max);

  const handleCategoryChange = (e) => {
    dispatch(setSelectedCategory(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const handlePriceChange = () => {
    dispatch(setPriceRange({ min: minPrice, max: maxPrice }));
  };

  return (
    <FiltersContainer>
      <FilterGroup>
        <FilterLabel>Category</FilterLabel>
        <FilterSelect value={selectedCategory} onChange={handleCategoryChange}>
          <option value="All">All Categories</option>
          <option value="W">Women's Clothing</option>
          <option value="M">Men's Clothing</option>
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Sort By</FilterLabel>
        <FilterSelect value={sortBy} onChange={handleSortChange}>
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Price Range</FilterLabel>
        <PriceRange>
          <PriceInput
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={handlePriceChange}
          />
          <span>to</span>
          <PriceInput
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={handlePriceChange}
          />
        </PriceRange>
      </FilterGroup>
    </FiltersContainer>
  );
};

export default ProductFilters; 