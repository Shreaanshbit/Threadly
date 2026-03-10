import { useState } from "react";
import { useCart } from "../context/index.jsx";
import { useToast } from "../context/index.jsx";
import { ALL_PRODUCTS } from "../data/mock.js";


const SECTIONS = ["All", "Men", "Women", "Accessories"];

function WishlistBtn() {
  const [active, setActive] = useState(false);
  return (
    <button className="wishlist-btn" onClick={e => { e.stopPropagation(); setActive(w => !w); }}>
      <svg width="20" height="20" viewBox="0 0 24 24"
        fill={active ? "#e74c3c" : "none"}
        stroke={active ? "#e74c3c" : "currentColor"} strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  );
}

export default function HomePage({ navigate }) {
  const { totalQty } = useCart();
  const show = useToast();

  const [section,     setSection]     = useState("All");
  const [sort,        setSort]        = useState("Featured Arrivals");
  const [priceFilter, setPriceFilter] = useState("all");

  // --- Filtering ---
  let products = [...ALL_PRODUCTS];
  if (section !== "All")         products = products.filter(p => p.section === section);
  if (priceFilter === "under50") products = products.filter(p => p.price < 50);
  if (priceFilter === "50-100")  products = products.filter(p => p.price >= 50 && p.price <= 100);
  if (priceFilter === "over100") products = products.filter(p => p.price > 100);
  if (sort === "Price: Low to High") products.sort((a, b) => a.price - b.price);
  if (sort === "Price: High to Low") products.sort((a, b) => b.price - a.price);

  // Count per section for badges
  const countFor = s => ALL_PRODUCTS.filter(p => p.section === s).length;

  const resetFilters = () => {
    setSection("All"); setPriceFilter("all"); setSort("Featured Arrivals");
    show("Filters reset", "info");
  };

  const heroTitle = section === "All" ? "All Collections" : `${section}'s Collection`;

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <a href="#" onClick={e => { e.preventDefault(); navigate("home"); }}>Threadly</a>
          </div>
          <ul className="nav-links">
            <li><a href="#" className="active" onClick={e => e.preventDefault()}>Home</a></li>
            <li><a href="#" onClick={e => { e.preventDefault(); navigate("cart"); }}>Cart</a></li>
            <li><a href="#" onClick={e => { e.preventDefault(); navigate("admin-login"); }}>Admin</a></li>
          </ul>
          <div className="nav-icons">
            <a href="#search" className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </a>
            <a href="#" className="icon-btn cart-icon" onClick={e => { e.preventDefault(); navigate("cart"); }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span className="cart-count">{totalQty}</span>
            </a>
            <a href="#profile" className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="fade-in">{heroTitle}</h1>
            <p className="fade-in-delay">Showing {products.length} curated items</p>
          </div>
        </section>

        <div className="container">
          <div className="products-layout">

            {/* ── SIDEBAR ── */}
            <aside className="sidebar">
              <div className="filter-header"><h3>REFINE SEARCH</h3></div>

              {/* Category / Section filter */}
              <div className="filter-section">
                <h4>Categories</h4>
                <label className="filter-option">
                  <input type="radio" name="section" value="All" checked={section === "All"} onChange={() => setSection("All")} />
                  <span>All</span>
                  <span className="count">{ALL_PRODUCTS.length}</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="section" value="Men" checked={section === "Men"} onChange={() => setSection("Men")} />
                  <span>Men</span>
                  <span className="count">{countFor("Men")}</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="section" value="Women" checked={section === "Women"} onChange={() => setSection("Women")} />
                  <span>Women</span>
                  <span className="count">{countFor("Women")}</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="section" value="Accessories" checked={section === "Accessories"} onChange={() => setSection("Accessories")} />
                  <span>Accessories</span>
                  <span className="count">{countFor("Accessories")}</span>
                </label>
              </div>

              {/* Price filter */}
              <div className="filter-section">
                <h4>Price Range</h4>
                {[["all","All Prices"],["under50","Under $50"],["50-100","$50 – $100"],["over100","Over $100"]].map(([val, label]) => (
                  <label className="filter-option" key={val}>
                    <input type="radio" name="price" value={val} checked={priceFilter === val} onChange={() => setPriceFilter(val)} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              <button className="reset-btn" onClick={resetFilters}>Reset Filters</button>
            </aside>

            {/* ── PRODUCT GRID ── */}
            <div className="products-grid">
              <div className="sort-bar">
                <span>SORT BY</span>
                <select id="sortSelect" value={sort} onChange={e => setSort(e.target.value)}>
                  <option>Featured Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>

              <div className="grid" id="productsGrid">
                {products.length === 0 ? (
                  <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"3rem", color:"var(--color-text-light)" }}>
                    <p>No products match your filters.</p>
                    <button className="reset-btn" style={{ marginTop:"1rem" }} onClick={resetFilters}>Clear Filters</button>
                  </div>
                ) : products.map(p => (
                  <div key={p.id} className="product-card" data-price={p.price}
                    style={{ cursor:"pointer" }} onClick={() => navigate("product", { productId: p.id })}>
                    <div className="product-image">
                      {p.badge && <span className={`badge${p.badgeClass ? " "+p.badgeClass : ""}`}>{p.badge}</span>}
                      <WishlistBtn />
                      <div className="product-img-wrapper" style={{ background: p.bg }}>
                        <div className="product-placeholder">{p.placeholder}</div>
                      </div>
                    </div>
                    <div className="product-info">
                      <div className="product-category">{p.category}</div>
                      <h3 className="product-name">{p.name}</h3>
                      <div className="product-rating">
                        <span className="stars">★</span>
                        <span className="rating-value">{p.rating}</span>
                      </div>
                      <div className="product-price">
                        <span className="price">${p.price}.00</span>
                        {p.oldPrice && <span className="old-price">{p.oldPrice}</span>}
                      </div>
                      <button className="view-details-btn"
                        onClick={e => { e.stopPropagation(); navigate("product", { productId: p.id }); }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Threadly</h3>
            <p>Premium clothing designed for the modern individual. Experience comfort, style, and sustainability with Threadly's curated collections.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
              <a href="#" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            </div>
          </div>
          <div className="footer-section">
            <h4>EXPLORE</h4>
            <ul>
              <li><a href="#" onClick={e => { e.preventDefault(); setSection("Men");         window.scrollTo(0,0); }}>Men's Collection</a></li>
              <li><a href="#" onClick={e => { e.preventDefault(); setSection("Women");       window.scrollTo(0,0); }}>Women's Collection</a></li>
              <li><a href="#" onClick={e => { e.preventDefault(); setSection("Accessories"); window.scrollTo(0,0); }}>Accessories</a></li>
              <li><a href="#" onClick={e => e.preventDefault()}>New Arrivals</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>SUPPORT</h4>
            <ul>
              <li><a href="#" onClick={e => e.preventDefault()}>Help Center</a></li>
              <li><a href="#" onClick={e => e.preventDefault()}>Shipping &amp; Returns</a></li>
              <li><a href="#" onClick={e => e.preventDefault()}>Track Order</a></li>
              <li><a href="#" onClick={e => { e.preventDefault(); navigate("admin-login"); }}>Admin Portal</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 THREADLY STORE. BUILT FOR EXCELLENCE.</p>
        </div>
      </footer>
    </>
  );
}
