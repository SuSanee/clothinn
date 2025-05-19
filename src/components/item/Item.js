import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Item.css";
import { useSelector } from 'react-redux';

function Item({ name, rating, price, image, brand }) {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="item-card">
      <LazyLoadImage
        alt={name}
        src={image}
        effect="blur"
        placeholderSrc="https://via.placeholder.com/300x300"
        style={{ width: "100%", objectFit: "cover", transition: "transform 0.3s" }}
      />
      <div className="item-content">
        <div className="item-brand">{brand}</div>
        <div className="item-name">{name}</div>
        <div className="item-info">
          <div className="item-price">${price}</div>
          <div className="item-rating">
            {rating}
            <span role="img" aria-label="star">⭐</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;