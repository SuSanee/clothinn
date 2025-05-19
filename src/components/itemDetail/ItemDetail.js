import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { toast } from "react-toastify";
import items from "../../mockData/items.json";
import "./ItemDetail.css";

const getItemDetail = (id) => items.filter((item) => item.id === id)[0];

function ItemDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemId = parseInt(params?.id);
  const item = !!itemId && getItemDetail(itemId);
  const cartItems = useSelector((state) => state.cart.items);
  const isAdded = cartItems.some((c) => c.id === itemId);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = () => {
    if (isAdded) {
      return;
    }
    setAdding(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAdding(false);
      toast.success("Added to bag!");
    }, 500);
  };

  if (!item) return <div>Item not found</div>;

  return (
    <div className="item-detail-container">
      <Link to="/"> &#8592; Back</Link>
      <div className="item-detail">
        <div className="item-detail-image">
          <img src={item.image} alt={"Item image"} />
        </div>
        <div className="item-detail-info">
          <div className="item-brand" style={{ margin: "0px 10px" }}>
            {item.brand}
          </div>
          <div className="item-name">{item.name}</div>
          <div className="item-price">${item.price}</div>

          <select className="item-size">
            <option value={"S"}> Select size (S)</option>
            <option value={"M"}> Select size (M)</option>
            <option value={"L"}> Select size (L)</option>
            <option value={"XL"}> Select size (XL)</option>
          </select>
          {isAdded ? (
            <Link to="/cart">
              <button className="item-btn">Go to Cart</button>
            </Link>
          ) : (
            <button
              className="item-btn"
              disabled={adding}
              onClick={handleAddToCart}
            >
              {adding ? "Adding..." : "Add To bag"}
            </button>
          )}
          <p className="item-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;