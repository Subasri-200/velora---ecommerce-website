import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=30")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch products");
        }
        return response.json();
      })
      .then((data) => setProducts(data.products))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  return (
    <section className="products-section shop-page">
      <div className="shop-header">
        <h1>Our Full Collection</h1>
        <p>Explore our exclusive collection of quality products.</p>
      </div>

      <div className="shop-controls">
        <div className="search-bar-wrapper">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="search"
            placeholder="Search by title..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="sort-wrapper">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="category-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="results-count">
        Showing <strong>{filteredProducts.length}</strong> products
      </div>

      {loading ? (
        <div className="loading-spinner">Loading collection...</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="empty-results">
          <h3>No products found</h3>
          <p>Try adjusting your search query or category filter.</p>
          <button
            className="product-button"
            onClick={() => {
              setSearch("");
              setSelectedCategory("all");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}