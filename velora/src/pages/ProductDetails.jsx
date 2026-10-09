import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load product details");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setActiveImage(data.thumbnail || (data.images && data.images[0]));
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="products-section empty-page">
        <div className="loading-spinner">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="products-section empty-page">
        <h2>Product Not Found</h2>
        <p>{error}</p>
        <Link to="/shop" className="product-button">
          Back to Shop
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const imagesList = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <div className="product-details-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{product.title}</span>
      </div>

      <div className="details-card">
        <div className="details-image-section">
          <div className="main-image-wrapper">
            <img src={activeImage} alt={product.title} />
          </div>
          {imagesList.length > 1 && (
            <div className="image-thumbnails">
              {imagesList.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`Thumbnail ${idx}`}
                  className={`thumbnail-item ${activeImage === imgUrl ? "active" : ""}`}
                  onClick={() => setActiveImage(imgUrl)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="details-info-section">
          <div className="brand-tag">{product.brand || "VELORA EXCLUSIVE"}</div>
          <h1>{product.title}</h1>
          <div className="rating-badge">
            ⭐ {product.rating || "4.8"} <span className="review-count">(128 reviews)</span>
          </div>

          <div className="price-tag">
            ${product.price}{" "}
            {product.discountPercentage && (
              <span className="discount-tag">-{Math.round(product.discountPercentage)}% OFF</span>
            )}
          </div>

          <p className="description">{product.description}</p>

          <div className="stock-info">
            <span className="stock-dot"></span> In Stock & Ready to Ship
          </div>

          <div className="quantity-selector">
            <label htmlFor="qty">Quantity:</label>
            <div className="qty-controls">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="qty-btn"
              >
                -
              </button>
              <input
                id="qty"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="qty-input"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="qty-btn"
              >
                +
              </button>
            </div>
          </div>

          <div className="details-action-buttons">
            <button className="action-btn buy-now-action" onClick={handleBuyNow}>
              ⚡ Buy Now
            </button>

            <button className="action-btn cart-action" onClick={() => addToCart(product, quantity)}>
              🛒 Add to Cart
            </button>

            <button
              className={`action-btn wishlist-action ${inWishlist ? "in-wishlist" : ""}`}
              onClick={() => toggleWishlist(product)}
            >
              {inWishlist ? "❤️ Saved in Wishlist" : "❤️ Add to Wishlist"}
            </button>
          </div>

          <div className="guarantee-box">
            <div className="guarantee-item">🔒 256-Bit Secure Checkout</div>
            <div className="guarantee-item">🚚 Express Delivery Available</div>
            <div className="guarantee-item">🔄 30-Day Easy Returns</div>
          </div>
        </div>
      </div>
    </div>
  );
}