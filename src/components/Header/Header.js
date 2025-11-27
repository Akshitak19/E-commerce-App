import React, { useContext } from "react";
import "./Header.css";
import AppContext from "../store/appcontext";

function Header() {
  const{openCart, openAddProduct}=useContext(AppContext);
  return (
    <header className="header">
      <h1>My React Store</h1>
      <div>
        <button
          className="yellow-button"
          onClick={openAddProduct}
          style={{ marginRight: "20px" }}
        >
          Add Product
        </button>
        <button className="yellow-button" onClick={openCart}>
          Cart
        </button>
      </div>
    </header>
  );
}

export default Header;
