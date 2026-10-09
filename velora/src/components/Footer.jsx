import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2 className="footer-logo">✦ VELORA</h2>
          <p>Everyday style, thoughtfully discovered. Elevating your daily routine with timeless quality.</p>
        </div>

        <div className="footer-links">
          <h4>Navigation</h4>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop Collection</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Shopping Cart</Link>
        </div>

        <div className="footer-links">
          <h4>Customer Care</h4>
          <a href="#shipping">Shipping & Delivery</a>
          <a href="#returns">Returns & Exchanges</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact Support</a>
        </div>

        <div className="footer-newsletter">
          <h4>Join the Club</h4>
          <p>Subscribe to receive 10% off your first order and exclusive updates.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing to VELORA!"); }} className="newsletter-form">
            <input type="email" placeholder="Your email address" required className="newsletter-input" />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} VELORA. All rights reserved.</p>
      </div>
    </footer>
  );
}