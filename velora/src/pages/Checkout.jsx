import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function Checkout() {
  const { cart, clearCart } = useShop();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "card",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <section className="products-section empty-page">
        <h1>🎉 Order Placed Successfully!</h1>
        <p>Thank you for shopping with VELORA. Your order is being processed.</p>
        <button
          onClick={() => navigate("/shop")}
          className="product-button"
          style={{ marginTop: "20px" }}
        >
          Continue Shopping
        </button>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="products-section empty-page">
        <h1>Checkout 💳</h1>
        <p>Your cart is currently empty. Please select a product to buy.</p>
        <Link to="/shop" className="product-button">
          Explore Products
        </Link>
      </section>
    );
  }

  return (
    <section className="products-section checkout-page">
      <h1>Checkout 💳</h1>
      <p>Complete your order details below.</p>

      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Information</h2>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              required
              placeholder="e.g. Jane Doe"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="e.g. jane@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              name="address"
              required
              placeholder="Street address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                name="city"
                required
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                id="zipCode"
                type="text"
                name="zipCode"
                required
                placeholder="ZIP / Postal Code"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <h2>Payment Method</h2>
          <div className="payment-options">
            <label className="payment-label">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={handleChange}
              />
              💳 Credit / Debit Card
            </label>
            <label className="payment-label">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === "paypal"}
                onChange={handleChange}
              />
              🅿️ PayPal
            </label>
            <label className="payment-label">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
              />
              💵 Cash on Delivery
            </label>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order (${subtotal.toFixed(2)})
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="checkout-items">
            {cart.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.thumbnail} alt={item.title} />
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p>Qty: {item.quantity}</p>
                  <p className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <hr className="summary-divider" />
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <hr className="summary-divider" />
          <div className="summary-row total-row">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
