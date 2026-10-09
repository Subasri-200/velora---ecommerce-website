import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useShop();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const freeShippingThreshold = 100;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "VELORA10") {
      setDiscount(subtotal * 0.1);
      alert("🎉 Promo code VELORA10 applied! 10% discount subtracted.");
    } else {
      alert("Invalid promo code. Try 'VELORA10'");
    }
  };

  const finalTotal = Math.max(0, subtotal - discount);

  if (cart.length === 0) {
    return (
      <section className="products-section empty-page">
        <div className="empty-icon">🛒</div>
        <h1>Your Shopping Cart is Empty</h1>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="product-button">
          Explore Collection
        </Link>
      </section>
    );
  }

  return (
    <section className="products-section cart-page">
      <h1>Shopping Cart ({cart.length} {cart.length === 1 ? "item" : "items"})</h1>

      {/* Free Shipping Progress Bar */}
      <div className="shipping-progress-card">
        {subtotal >= freeShippingThreshold ? (
          <p>🎉 <strong>Congratulations!</strong> You unlocked FREE Shipping!</p>
        ) : (
          <p>
            Add <strong>${(freeShippingThreshold - subtotal).toFixed(2)}</strong> more to unlock FREE Shipping!
          </p>
        )}
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="cart-container">
        <div className="cart-items-list">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="cart-item-img"
                />
              </Link>
              <div className="cart-item-info">
                <p className="category">{item.category}</p>
                <Link to={`/product/${item.id}`}>
                  <h3>{item.title}</h3>
                </Link>
                <p className="price">${item.price}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="qty-val">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-total">
                <p className="item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove item"
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-actions-bar">
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="summary-row discount-row">
              <span>Discount (10%)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Shipping</span>
            <span>{subtotal >= freeShippingThreshold ? "FREE" : "$5.00"}</span>
          </div>

          <form onSubmit={handleApplyPromo} className="promo-form">
            <input
              type="text"
              placeholder="Promo code (e.g. VELORA10)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="promo-input"
            />
            <button type="submit" className="promo-btn">Apply</button>
          </form>

          <hr className="summary-divider" />
          <div className="summary-row total-row">
            <span>Total</span>
            <span>${(finalTotal + (subtotal >= freeShippingThreshold ? 0 : 5)).toFixed(2)}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout →
          </button>

          <Link to="/shop" className="continue-shopping">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}