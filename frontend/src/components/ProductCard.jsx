import { useState } from "react";
import { useCart } from "../context/index.jsx";
import { useToast } from "../context/index.jsx";

export default function ProductCard({ product, navigate }) {
  const { addItem } = useCart();
  const showToast = useToast();
  const [wishlisted, setWishlisted] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product);
    showToast(`${product.name} added to cart! 🎉`, "success");
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setWishlisted((w) => !w);
    showToast(wishlisted ? "Removed from wishlist" : "Added to wishlist ❤️", "info");
  };

  return (
    <div className="product-card" onClick={() => navigate("product")}>
      <div className="product-image">
        {product.badge && (
          <span className={`badge ${product.badgeClass || ""}`}>{product.badge}</span>
        )}
        <button className={`wishlist-btn ${wishlisted ? "active" : ""}`} onClick={handleWishlist} aria-label="Wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" style={{ color: wishlisted ? "#e74c3c" : "inherit" }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <div className="product-img-wrapper" style={{ background: product.bg }}>
          <div className="product-placeholder">{product.placeholder}</div>
        </div>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <span className="stars">★</span>
          <span className="rating-value">{product.rating}</span>
        </div>
        <div className="product-price">
          <span className="price">${product.price}.00</span>
          {product.oldPrice && <span className="old-price">${product.oldPrice}.00</span>}
        </div>
        <button className="view-details-btn" onClick={handleAddToCart}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>
          View Details
        </button>
      </div>
    </div>
  );
}
