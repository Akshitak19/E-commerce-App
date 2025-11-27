import { useContext } from "react";
import Modal from "../UI/Modal";
import "./cart.css";
import AppContext from "../store/appcontext";

function CartItem({ id, name, image, quantity, onDecQuantity, onIncQuantity }) {
  return (
    <div key={id} className="cart-item">
      <div className="item-img">
        <img src={require(`../../assets/${image}`)} alt={name} />
      </div>
      <div className="item-info">
        <div>{name}</div>
        <div className="item-qty">
          <div>Qty: {quantity}</div>
          <div>
            <button
              className="yellow-button qty-button qty-plus-button"
              onClick={() => onIncQuantity(id)}
            >
              +
            </button>
          </div>
          <div>
            <button
              className="yellow-button qty-button"
              onClick={() => onDecQuantity(id)}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cart() {
  const {cartItems, handleIncreaseQuantity, handleDecreaseQuantity, closeCart, showCart} = useContext(AppContext);
  return (
    <Modal show={showCart} onClose={closeCart}>
      <div className="cart-container">
        <p className="cart-heading">Cart</p>
        {cartItems.length === 0 ? (
          <div className="empty-cart">Cart is empty</div>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              quantity={item.quantity}
              onIncQuantity={handleIncreaseQuantity}
              onDecQuantity={handleDecreaseQuantity}
            />
          ))
        )}
        <div className="cart-buttons">
          <button className="black-button close-cart" onClick={closeCart}>
            Close
          </button>
          {cartItems.length > 0 && (
            <button className="yellow-button" onClick={closeCart}>
              Checkout
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default Cart;
