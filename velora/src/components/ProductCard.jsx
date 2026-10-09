import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const navigate = useNavigate();
  const inWishlist = isInWishlist(product.id);

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate("/checkout");
  };

  return (
    <div className="product-card">
      <div className="product-img-container">
        <Link to={`/product/${product.id}`}>
          <img src={product.thumbnail} alt={product.title} />
        </Link>
        <button
          className={`wishlist-btn ${inWishlist ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {inWishlist ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="product-info">
        <p className="category">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3>{product.title}</h3>
        </Link>
        <p className="price">${product.price}</p>

        <div className="card-actions">
          <button
            className="product-button buy-now-btn"
            onClick={handleBuyNow}
            title="Buy Now"
          >
            ⚡ Buy Now
          </button>
          <button
            className="product-button cart-btn"
            onClick={() => addToCart(product)}
            title="Add to Cart"
          >
            🛒 Cart
          </button>
          <Link to={`/product/${product.id}`} className="product-button view-btn" title="View Details">
            👁️
          </Link>
        </div>
      </div>
    </div>
  );
}