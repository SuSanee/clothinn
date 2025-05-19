import React from "react";
import { Link } from "react-router-dom";
import Item from "../item/Item";
import "./ItemList.css"; // <-- Make sure this is imported

function ItemList({ items }) {
  if (!items || items.length === 0) {
    return <div className="empty-message">No items found</div>;
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <Link
          to={`/item/${item.id}`}
          key={item.id}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item
            name={item.name}
            rating={item.rating}
            price={item.price}
            saleDiscount={item.saleDiscount}
            image={item.image}
            brand={item.brand}
          />
        </Link>
      ))}
    </div>
  );
}

export default ItemList;