import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/navbar/Navbar';
import HomePage from './components/home/HomePage';
import ItemDetail from './components/itemDetail/ItemDetail';
import Cart from './components/cart/Cart';
import Orders from './components/orders/Orders';
import Checkout from './components/checkout/Checkout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from './components/common/NotFound';
import ProtectedRoute from './components/common/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 1rem;
`;

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Navbar />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            
            {/* 404 Route */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </MainContent>
        <ToastContainer position="bottom-right" />
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;