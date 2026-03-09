import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { PRODUCT_DETAIL } from "../data/index.js";
import { useCart } from "../context/index.jsx";
import { useToast } from "../context/index.jsx";

export default function ProductDetailPage({ navigate }) {
  const p = PRODUCT_DETAIL;
  const { addItem } = useCart();
  const showToast = useToast();

  const [activeImg,   setActiveImg]   = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [activeSize,  setActiveSize]  = useState(null);
  const [wishlisted,  setWishlisted]  = useState(false);
  const [imgFade,     setImgFade]     = useState(false);

  const handleThumb = (i) => {
    setImgFade(true);
    setTimeout(() => { setActiveImg(i); setImgFade(false); }, 200);
  };

  const handleAddToCart = () => {
    if (activeSize === null) { showToast("Please select a size", "error"); return; }
    addItem({ id: p.id, name: p.name, price: p.price, bg: p.images[activeImg].bg, placeholder: "HOODIE" });
    showToast("Added to cart! 🎉", "success");
  };

  return (
    <>
      <Navbar page="product" navigate={navigate} />

      <div className="breadcrumb">
        <div className="container">
          <span style={{ cursor: "pointer", color: "var(--text-light)" }} onClick={() => navigate("home")}>HOME</span>
          <span className="sep">/</span>
          <span style={{ color: "var(--text-light)", cursor: "pointer" }}>MEN</span>
          <span className="sep">/</span>
          <span>OUTERWEAR</span>
        </div>
      </div>

      <main className="product-detail">
        <div className="container">
          <div className="product-layout">

            {/* Gallery */}
            <div className="product-gallery">
              <div className="main-image">
                <div className="product-img-large" style={{ background: p.images[activeImg].bg, opacity: imgFade ? 0 : 1 }}>
                  <div className="product-placeholder-large">{p.images[activeImg].label}</div>
                </div>
              </div>
              <div className="thumbnail-gallery">
                {p.images.map((img, i) => (
                  <div key={i} className={`thumbnail ${activeImg === i ? "active" : ""}`}
                    style={{ background: img.bg }} onClick={() => handleThumb(i)}>
                    <span className="thumb-text">{img.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="product-details fade-in">
              <div className="product-tag">{p.tag}</div>
              <h1 className="product-title">{p.name}</h1>
              <div className="product-rating-detail">
                <div className="stars-large">{"★".repeat(p.rating)}</div>
                <span className="reviews-count">({p.reviews} Reviews)</span>
              </div>
              <div className="price-section">
                <span className="current-price">${p.price}.00</span>
                <span className="original-price">${p.oldPrice}.00</span>
                <span className="discount-badge">{p.discount}</span>
              </div>
              <p className="product-description">{p.description}</p>

              {/* Colors */}
              <div className="color-selector">
                <h3>COLOR — <span>{p.colors[activeColor].name}</span></h3>
                <div className="color-options">
                  {p.colors.map((c, i) => (
                    <button key={c.name} className={`color-option ${activeColor === i ? "active" : ""}`}
                      style={{ background: c.bg }} onClick={() => setActiveColor(i)} aria-label={c.name} />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="size-selector">
                <div className="size-header">
                  <h3>SELECT SIZE</h3>
                  <a href="#" className="size-guide">FIND YOUR FIT</a>
                </div>
                <div className="size-options">
                  {p.sizes.map((s) => (
                    <button key={s} className={`size-option ${activeSize === s ? "active" : ""}`}
                      onClick={() => setActiveSize(s)}>{s}</button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="action-buttons">
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  ADD TO CART
                </button>
                <button className="wishlist-btn-large" onClick={() => { setWishlisted(!wishlisted); showToast(wishlisted ? "Removed from wishlist" : "Added to wishlist ❤️", "info"); }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  WISHLIST
                </button>
              </div>

              {/* Specs */}
              <div className="product-specs">
                <details open>
                  <summary>PRODUCT SPECIFICATIONS</summary>
                  <div className="specs-content">
                    {p.specs.map((s) => (
                      <div key={s.label} className="spec-row">
                        <span className="spec-label">{s.label}</span>
                        <span>{s.value}</span>
                      </div>
                    ))}
                  </div>
                </details>
                <details>
                  <summary>SHIPPING &amp; RETURNS</summary>
                  <div className="specs-content">
                    <p>Free express shipping on orders over $100. Easy 30-day returns.</p>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Related */}
          <section className="style-with-this">
            <h2>Style With This</h2>
            <p className="section-subtitle">Curated pairings by Threadly stylists</p>
            <div className="recommendations-grid">
              {p.related.map((r) => (
                <div key={r.name} className="recommendation-card" onClick={() => navigate("product")}>
                  <div className="rec-image" style={{ background: r.bg }}>
                    <div className="rec-placeholder">{r.placeholder}</div>
                  </div>
                  <h4>{r.name}</h4>
                  <p className="rec-price">{r.price}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
