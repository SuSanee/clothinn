import React from "react";
import "./Item.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Item({ name, rating, price, saleDiscount, image, brand }) {
  return (
    <div className="item-card">
      <LazyLoadImage
        alt="Item image"
        src={image}
        effect="blur"
        placeholderSrc="https://via.placeholder.com/300x300"
        width="100%"
      />
      <div className="item-brand">{brand}</div>
      <div className="item-name">{name}</div>
      <div className="item-info">
        <div className="item-price">${price}</div>
        <div className="item-rating">{rating}&#9733;</div>
      </div>
    </div>
  );
}

export default Item;