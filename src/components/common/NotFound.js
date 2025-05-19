import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #666;
`;

const HomeButton = styled(Link)`
  padding: 1rem 2rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Message>Oops! The page you're looking for doesn't exist.</Message>
      <HomeButton to="/">Return to Home</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound; 