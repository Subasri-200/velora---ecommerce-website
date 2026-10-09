import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useShop();
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    addToCart(product, 1);
    navigate("/checkout");
  };

  if (wishlist.length === 0) {
    return (
      <section className="products-section empty-page">
        <h1>My Wishlist ❤️</h1>
        <p>Your favourite products will appear here.</p>
        <Link to="/shop" className="product-button">
          Explore Products
        </Link>
      </section>
    );
  }

  return (
    <section className="products-section wishlist-page">
      <h1>My Wishlist ❤️ ({wishlist.length} {wishlist.length === 1 ? "item" : "items"})</h1>
      <p>Items saved for later.</p>

      <div className="product-grid">
        {wishlist.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-img-container">
              <Link to={`/product/${product.id}`}>
                <img src={product.thumbnail} alt={product.title} />
              </Link>
              <button
                className="wishlist-btn active"
                onClick={() => removeFromWishlist(product.id)}
                title="Remove from Wishlist"
              >
                💔
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
                  onClick={() => handleBuyNow(product)}
                >
                  ⚡ Buy Now
                </button>
                <button
                  className="product-button cart-btn"
                  onClick={() => addToCart(product)}
                >
                  🛒 Cart
                </button>
                <button
                  className="product-button remove-wishlist-btn"
                  onClick={() => removeFromWishlist(product.id)}
                  title="Remove from Wishlist"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}