import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCategory, searchProducts } from "../../store/slices/productSlice";
import { logout } from "../../store/slices/authSlice";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1rem;
`;

const NavItem = styled.li`
  margin: 0 1rem;
  cursor: pointer;
  color: #333;
  transition: all 0.3s;
  padding: 0.5rem 1rem;
  border-radius: 4px;

  &:hover {
    color: #007bff;
    background-color: #f8f9fa;
  }

  &.active {
    color: #007bff;
    background-color: #e9ecef;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;
  position: relative;
  flex: 1;
  max-width: 500px;
`;

const SearchInput = styled.input`
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  width: 100%;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  cursor: pointer;
`;

const CartIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: #333;
  text-decoration: none;
  margin: 0 1rem;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff4444;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleCategoryClick = (category, tabName) => {
    dispatch(setSelectedCategory(category));
    setActiveTab(tabName);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchProducts(searchTerm));
  };

  return (
    <NavbarContainer>
      <Logo to="/" onClick={() => handleCategoryClick("All", "Home")}>
        clothinn
      </Logo>
      <NavList>
        <NavItem
          className={activeTab === "Home" ? "active" : ""}
          onClick={() => handleCategoryClick("All", "Home")}
        >
          Home
        </NavItem>
        <NavItem
          className={activeTab === "Womens" ? "active" : ""}
          onClick={() => handleCategoryClick("W", "Womens")}
        >
          Womens
        </NavItem>
        <NavItem
          className={activeTab === "Mens" ? "active" : ""}
          onClick={() => handleCategoryClick("M", "Mens")}
        >
          Mens
        </NavItem>

        <SearchContainer>
          <form onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon onClick={handleSearch} />
          </form>
        </SearchContainer>

        <Link to="/cart">
          <CartIcon>
            <FaShoppingCart size={20} />
            {items.length > 0 && <CartCount>{items.length}</CartCount>}
          </CartIcon>
        </Link>

        {isAuthenticated ? (
          <>
            <NavItem as={Link} to="/orders">Orders</NavItem>
            <UserButton onClick={handleLogout}>
              <FaUser size={16} />
              {user?.name || 'User'}
            </UserButton>
          </>
        ) : (
          <NavItem as={Link} to="/login">Hi Anshika</NavItem>
        )}
      </NavList>
    </NavbarContainer>
  );
};

export default Navbar;
