import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { GlobalContext } from "../../context/GlobalState";

const Navbar = () => {
  const { cart, setSelectedCategory } = useContext(GlobalContext);
  const [activeTab, setActiveTab] = useState("Home"); // NEW

  const handleCategoryClick = (category, tabName) => {
    setSelectedCategory(category);
    setActiveTab(tabName);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <h2 onClick={() => handleCategoryClick("All", "Home")}>clothinn</h2>
      </Link>
      <ul className="navbar-ul">
        <li
          className={activeTab === "Home" ? "active-tab" : ""}
          onClick={() => handleCategoryClick("All", "Home")}
        >
          Home
        </li>
        <li
          className={activeTab === "Womens" ? "active-tab" : ""}
          onClick={() => handleCategoryClick("W", "Womens")}
        >
          Womens
        </li>
        <li
          className={activeTab === "Mens" ? "active-tab" : ""}
          onClick={() => handleCategoryClick("M", "Mens")}
        >
          Mens
        </li>

        <Link to="/cart">
          <li>
            &#128722;{" "}
            <span className="card-count" style={{ color: "red" }}>
              ({cart.length})
            </span>
          </li>
        </Link>
        <Link to="/orders">
          <li>Orders</li>
        </Link>
        <button className="nav-btn">Hi, Den</button>
      </ul>
    </div>
  );
};

export default Navbar;
