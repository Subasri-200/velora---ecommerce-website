import { Link, NavLink } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function Navbar() {
  const { cartCount, wishlistCount } = useShop();

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <span className="logo-sparkle">✦</span> VELORA
      </Link>

      <nav className="nav-menu">
        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Home
        </NavLink>
        <NavLink to="/shop" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Shop
        </NavLink>
        <NavLink to="/wishlist" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <span>❤️ Wishlist</span>
          {wishlistCount > 0 && <span className="badge badge-wishlist">{wishlistCount}</span>}
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <span>🛒 Cart</span>
          {cartCount > 0 && <span className="badge badge-cart">{cartCount}</span>}
        </NavLink>
      </nav>
    </header>
  );
}