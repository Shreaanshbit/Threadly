import { useMemo, useState } from "react";
import { useCart, useToast } from "../context/index.jsx";
import { ALL_PRODUCTS } from "../data/mock.js";

const COLORS = [
  ["OBSIDIAN BLACK", "#2F3E46"],
  ["CLOUD GREY", "#CAD2C5"],
  ["FOREST GREEN", "#52796F"]
];

const SIZES = ["S", "M", "L", "XL"];

export default function ProductPage({ navigate, route }) {
  const { addItem, totalQty } = useCart();
  const show = useToast();

  const product = useMemo(() => {
    return ALL_PRODUCTS.find((p) => p.id === route?.productId) || null;
  }, [route]);

  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize] = useState(null);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="page">
        <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
          <h2>Product not found</h2>
          <p style={{ margin: "1rem 0", color: "var(--color-text-light)" }}>
            The product you are looking for could not be loaded.
          </p>
          <button className="view-details-btn" onClick={() => navigate("home")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!activeSize) {
      show("Please select a size", "error");
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.offer ?? product.price,
      offer: product.offer ?? null,
      img: product.img || "",
      cat: product.cat,
      stock: product.stock ?? 0,
      color: COLORS[activeColor][0],
      size: activeSize
    });

    show("Added to cart! 🎉", "success");
  };

  const relatedProducts = ALL_PRODUCTS
    .filter((p) => p.id !== product.id && p.cat === product.cat)
    .slice(0, 4);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("home"); }}>THREADLY</a>
          </div>

          <ul className="nav-links">
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("home"); }}>Home</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("cart"); }}>Cart</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("admin-login"); }}>Admin</a></li>
          </ul>

          <div className="nav-icons">
            <a href="#search" className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </a>

            <a href="#" className="icon-btn cart-icon" onClick={(e) => { e.preventDefault(); navigate("cart"); }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="cart-count">{totalQty}</span>
            </a>
          </div>
        </div>
      </nav>

      <div className="breadcrumb">
        <div className="container">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("home"); }}>HOME</a> /{" "}
          <span>{product.cat?.toUpperCase()}</span> / <span>{product.name.toUpperCase()}</span>
        </div>
      </div>

      <main className="product-detail">
        <div className="container">
          <div className="product-layout">
            <div className="product-gallery">
              <div className="main-image" id="mainImage">
                <div
                  className="product-img-large"
                  style={{
                    backgroundImage: product.img ? `url(${product.img})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "#f3f3f3"
                  }}
                >
                  {!product.img && (
                    <div className="product-placeholder-large">
                      {product.name.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="product-details">
              <div className="product-tag">THREADLY ESSENTIALS</div>
              <h1 className="product-title">{product.name}</h1>

              <div className="product-rating-detail">
                <div className="stars-large">★★★★★</div>
                <span className="reviews-count">({product.reviews || 0} Reviews)</span>
              </div>

              <div className="price-section">
                <span className="current-price">${(product.offer ?? product.price).toFixed(2)}</span>
                {product.offer && <span className="original-price">${product.price.toFixed(2)}</span>}
                {product.offer && (
                  <span className="discount-badge">
                    -{Math.round(((product.price - product.offer) / product.price) * 100)}% 🔥
                  </span>
                )}
              </div>

              <p className="product-description">
                Premium quality {product.name.toLowerCase()} crafted for modern everyday wear.
              </p>

              <div className="color-selector">
                <h3>COLOR — <span>{COLORS[activeColor][0]}</span></h3>
                <div className="color-options">
                  {COLORS.map(([name, bg], i) => (
                    <button
                      key={name}
                      className={`color-option${activeColor === i ? " active" : ""}`}
                      style={{ background: bg }}
                      onClick={() => setActiveColor(i)}
                    />
                  ))}
                </div>
              </div>

              <div className="size-selector">
                <div className="size-header">
                  <h3>SELECT SIZE</h3>
                  <a href="#" className="size-guide" onClick={(e) => e.preventDefault()}>
                    FIND YOUR FIT
                  </a>
                </div>

                <div className="size-options">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      className={`size-option${activeSize === s ? " active" : ""}`}
                      onClick={() => setActiveSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="action-buttons">
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  ADD TO CART
                </button>

                <button
                  className="wishlist-btn-large"
                  onClick={() => {
                    setWishlisted((w) => !w);
                    show(wishlisted ? "Removed from wishlist" : "Added to wishlist ❤️", "info");
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  WISHLIST
                </button>
              </div>

              <div className="product-specs">
                <details open>
                  <summary>PRODUCT SPECIFICATIONS</summary>
                  <div className="specs-content">
                    <div className="spec-row">
                      <span className="spec-label">Category</span>
                      <span className="spec-value">{product.cat}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Stock</span>
                      <span className="spec-value">{product.stock ?? 0} available</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Fitting</span>
                      <span className="spec-value">True to size</span>
                    </div>
                  </div>
                </details>

                <details>
                  <summary>SHIPPING & RETURNS</summary>
                  <div className="specs-content">
                    <p>Free express shipping on orders over $100. Easy 30-day returns.</p>
                  </div>
                </details>
              </div>
            </div>
          </div>

          <section className="style-with-this">
            <h2>Style With This</h2>
            <p className="section-subtitle">Curated pairings by Threadly stylists</p>

            <div className="recommendations-grid">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  className="recommendation-card"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("product", { productId: p.id })}
                >
                  <div
                    className="rec-image"
                    style={{
                      backgroundImage: p.img ? `url(${p.img})` : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundColor: "#f3f3f3"
                    }}
                  >
                    {!p.img && <div className="rec-placeholder">{p.name}</div>}
                  </div>
                  <h4>{p.name}</h4>
                  <p className="rec-price">${(p.offer ?? p.price).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>THREADLY</h3>
            <p>Architectural design essentials through uncompromising quality. Built for the longevity of your wardrobe since 2023.</p>
          </div>

          <div className="footer-section">
            <h4>SHOP</h4>
            <ul>
              <li><a href="#" onClick={(e) => e.preventDefault()}>New Drops</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Best Sellers</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Sale Archives</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>HELP</h4>
            <ul>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Track Order</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Returns Portal</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Sizing Guide</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}