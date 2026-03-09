import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { useCart } from "../context/index.jsx";
import { useToast } from "../context/index.jsx";

// Exact 6 products from index.html
const PRODUCTS = [
  { id:1, price:129, badge:"NEW SEASON", badgeClass:"", bg:"linear-gradient(135deg,#2F3E46 0%,#354F52 100%)", placeholder:"CLASSIC NAVY BLAZER",  category:"MEN'S OUTERWEAR",  name:"Classic Navy Slim-Fit Blazer",       rating:"4.8", oldPrice:"$180.00" },
  { id:2, price:89,  badge:"LIMITED OFFER", badgeClass:"limited", bg:"linear-gradient(135deg,#52796F 0%,#84A98C 100%)", placeholder:"MERINO WOOL SWEATER", category:"MEN'S ESSENTIALS", name:"Premium Merino Wool Sweater",         rating:"4.9", oldPrice:"$145.00" },
  { id:3, price:55,  badge:null, bg:"linear-gradient(135deg,#CAD2C5 0%,#84A98C 100%)", placeholder:"OXFORD SHIRT",        category:"MEN'S SHIRTS",    name:"Oxford Button-Down Shirt",           rating:"4.9", oldPrice:"$75.00" },
  { id:4, price:72,  badge:null, bg:"linear-gradient(135deg,#84A98C 0%,#CAD2C5 100%)", placeholder:"ORGANIC HOODIE",      category:"THREADLY ESSENTIALS", name:"Signature Oversized Organic Hoodie", rating:"4.8", oldPrice:"$110.00" },
  { id:5, price:120, badge:"NEW SEASON", badgeClass:"", bg:"linear-gradient(135deg,#354F52 0%,#52796F 100%)", placeholder:"SELVEDGE DENIM",       category:"MEN'S DENIM",     name:"Slim-Fit Selvedge Denim",            rating:"4.7", oldPrice:"$160.00" },
  { id:6, price:45,  badge:null, bg:"linear-gradient(135deg,#CAD2C5 0%,#fff 100%)",    placeholder:"ESSENTIAL TEE",       category:"MEN'S BASICS",    name:"Essential Cotton Tee",               rating:"4.6", oldPrice:null },
];

function WishlistBtn() {
  const [active, setActive] = useState(false);
  return (
    <button className="wishlist-btn" onClick={e=>{e.stopPropagation();setActive(!active);}}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill={active?"#e74c3c":"none"} stroke={active?"#e74c3c":"currentColor"} strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  );
}

export default function HomePage({ navigate }) {
  const { addItem } = useCart();
  const show = useToast();
  const [page, setPage] = useState(1);

  const sorted = [...PRODUCTS];

  return (
    <>
      <Navbar navigate={navigate} />

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="fade-in">Men's Collection</h1>
            <p className="fade-in-delay">Showing 124 curated items</p>
          </div>
        </section>

        <div className="container">
          <div className="products-layout">

            <aside className="sidebar">
              <div className="filter-header"><h3>REFINE SEARCH</h3></div>
              <div className="filter-section">
                <h4>Categories</h4>
                <label className="filter-option"><input type="radio" name="category" value="men" defaultChecked/><span>Men</span><span className="count">124</span></label>
                <label className="filter-option"><input type="radio" name="category" value="women"/><span>Women</span><span className="count">86</span></label>
                <label className="filter-option"><input type="radio" name="category" value="kids"/><span>Kids</span><span className="count">42</span></label>
              </div>
              <div className="filter-section">
                <h4>Price Range</h4>
                <label className="filter-option"><input type="radio" name="price" value="under50"/><span>Under $50</span></label>
                <label className="filter-option"><input type="radio" name="price" value="50-100"/><span>$50 - $100</span></label>
                <label className="filter-option"><input type="radio" name="price" value="over100"/><span>Over $100</span></label>
              </div>
              <button className="reset-btn">Reset Filters</button>
            </aside>

            <div className="products-grid">
              <div className="sort-bar">
                <span>SORT BY</span>
                <select id="sortSelect">
                  <option>Featured Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>

              <div className="grid" id="productsGrid">
                {sorted.map(p=>(
                  <div key={p.id} className="product-card" data-price={p.price}>
                    <div className="product-image">
                      {p.badge && <span className={`badge${p.badgeClass?" "+p.badgeClass:""}`}>{p.badge}</span>}
                      <WishlistBtn/>
                      <div className="product-img-wrapper" style={{background:p.bg}}>
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
                      <button className="view-details-btn" onClick={()=>navigate("product")}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pagination">
                <button className="page-btn" disabled>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <span>...</span>
                <button className="page-btn">12</button>
                <button className="page-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Threadly</h3>
            <p>Premium clothing designed for the modern individual. Experience comfort, style, and sustainability with Threadly's curated collections.</p>
            <div className="social-links">
              <a href="#"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
              <a href="#"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            </div>
          </div>
          <div className="footer-section">
            <h4>EXPLORE</h4>
            <ul>
              <li><a href="#">Men's Collection</a></li>
              <li><a href="#">Women's Collection</a></li>
              <li><a href="#">Kids &amp; Baby</a></li>
              <li><a href="#">New Arrivals</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>SUPPORT</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Shipping &amp; Returns</a></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#" className="admin-link" onClick={e=>{e.preventDefault();navigate("admin-login");}}>Admin Portal</a></li>
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
