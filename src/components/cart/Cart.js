import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../store/slices/cartSlice";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  if (!cartItems.length) {
    return (
      <div className="cart-container">
        <h1>Cart</h1>
        <p>No Item Added! Please add something to your cart</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <div className="cart-list">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }} />
            <div style={{ flex: 1, marginLeft: 16 }}>
              <div className="item-name">{item.name}</div>
              <div className="item-brand">{item.brand}</div>
              <div className="item-price">${item.price} x {item.quantity || 1}</div>
              <div>
                <button onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}>-</button>
                <span style={{ margin: "0 8px" }}>{item.quantity || 1}</span>
                <button onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}>+</button>
              </div>
              <button onClick={() => handleRemove(item.id)} style={{ marginTop: 8, color: "red" }}>Remove</button>
            </div>
            <div style={{ marginLeft: "auto", fontWeight: "bold" }}>
              ${(item.price * (item.quantity || 1)).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Bill Summary</h3>
        <div>Total Items: {totalItems}</div>
        <div>Total Price: <b>${totalPrice.toFixed(2)}</b></div>
        <Link to="/checkout">
          <button className="item-btn" style={{ marginTop: 16 }}>Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;