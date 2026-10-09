import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=8")
      .then((res) => res.json())
      .then((data) => setFeaturedProducts(data.products))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">✨ NEW COLLECTION 2026</span>
          <h1>Discover Your Everyday Style</h1>
          <p>
            Curated premium products crafted for comfort, elegance, and your everyday lifestyle.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="hero-button primary-hero-btn">
              Explore Collection →
            </Link>
            <Link to="/wishlist" className="hero-button secondary-hero-btn">
              ❤️ View Wishlist
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Value Props */}
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3>Free Express Shipping</h3>
          <p>On all orders above $50 with live tracking.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">✨</div>
          <h3>Premium Quality</h3>
          <p>Hand-picked materials and verified durability.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌿</div>
          <h3>Eco Packaging</h3>
          <p>100% recyclable and sustainable packaging.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>30-Day Guarantee</h3>
          <p>Hassle-free refunds and easy 24/7 support.</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="section-header">
          <div>
            <span className="sub-title">HANDPICKED FOR YOU</span>
            <h2>Trending Products</h2>
          </div>
          <Link to="/shop" className="view-all-link">
            View All Products →
          </Link>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading trending products...</div>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}