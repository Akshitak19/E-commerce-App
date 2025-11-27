import React, { useContext } from "react";
import "./Products.css";
import AppContext from "../store/appcontext";

export function Product({ id, name, image, onAddToCart }) {
  return (
    <div key={id} className="product">
      <img src={require(`../../assets/${image}`)} alt={name} />
      <div className="product-name">{name}</div>
      <button onClick={() => onAddToCart(id, name, image)}>Add to cart</button>
    </div>
  );
}

function Products() {
  const {products, handleAddToCart}=useContext(AppContext);
  return (
    <div className="products-container">
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.image}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

export default Products;
