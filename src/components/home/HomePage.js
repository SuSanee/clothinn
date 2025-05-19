import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/slices/productSlice";
import ItemList from "../itemList/ItemList";
import LoadingSpinner from "../common/LoadingSpinner";
import ProductFilters from "../filters/ProductFilters";
import styled from "styled-components";

const HomeContainer = styled.div`
  padding: 2rem;
  max-width: 100%;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FiltersSection = styled.div`
  position: sticky;
  top: 2rem;
  height: fit-content;
`;

const ProductsSection = styled.div`
  min-width: 0; // Prevents grid item from overflowing
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #dc3545;
  background-color: #f8d7da;
  border-radius: 4px;
  margin: 1rem 0;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.2rem;
`;

function HomePage() {
  const dispatch = useDispatch();
  const { items, filteredItems, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!filteredItems?.length && !items?.length) {
    return <NoResultsMessage>No products found</NoResultsMessage>;
  }

  return (
    <HomeContainer>
      <ContentWrapper>
        <FiltersSection>
          <ProductFilters />
        </FiltersSection>
        <ProductsSection>
          <ItemList items={filteredItems || items} />
        </ProductsSection>
      </ContentWrapper>
    </HomeContainer>
  );
}

export default HomePage;
