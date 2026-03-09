import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { useCart } from "../context/index.jsx";
import { useToast } from "../context/index.jsx";

const PRODUCT_NAV = [
  {label:"NEW DROPS",href:"home"},{label:"COLLECTIONS",href:"home"},
  {label:"JOURNAL",href:"home"},{label:"SUSTAINABILITY",href:"home"},
];

export default function ProductPage({ navigate }) {
  const { addItem } = useCart();
  const show = useToast();
  const [activeImg, setActiveImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState("OBSIDIAN BLACK");
  const [selectedSize, setSelectedSize] = useState("M");
  const [wishlisted, setWishlisted] = useState(false);

  const images = [
    { bg:"linear-gradient(135deg,#84A98C 0%,#CAD2C5 100%)", label:"Front" },
    { bg:"linear-gradient(135deg,#52796F 0%,#84A98C 100%)", label:"Detail" },
    { bg:"linear-gradient(135deg,#354F52 0%,#52796F 100%)", label:"Back" },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <a href="#" onClick={e=>{e.preventDefault();navigate("home");}}>THREADLY</a>
          </div>
          <ul className="nav-links">
            {PRODUCT_NAV.map(l=>(
              <li key={l.label}><a href="#" onClick={e=>{e.preventDefault();navigate(l.href);}}>{l.label}</a></li>
            ))}
          </ul>
          <div className="nav-icons">
            <a href="#search" className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </a>
            <a href="#" className="icon-btn cart-icon" onClick={e=>{e.preventDefault();navigate("cart");}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <span className="cart-count">2</span>
            </a>
            <a href="#profile" className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </a>
          </div>
        </div>
      </nav>

      <div className="breadcrumb">
        <div className="container">
          <a href="#" onClick={e=>{e.preventDefault();navigate("home");}}>HOME</a> / <a href="#">MEN</a> / <span>OUTERWEAR</span>
        </div>
      </div>

      <main className="product-detail">
        <div className="container">
          <div className="product-layout">

            <div className="product-gallery">
              <div className="main-image" id="mainImage">
                <div className="product-img-large" style={{background:images[activeImg].bg}}>
                  <div className="product-placeholder-large">SIGNATURE OVERSIZED<br/>ORGANIC HOODIE</div>
                </div>
              </div>
              <div className="thumbnail-gallery">
                {images.map((img,i)=>(
                  <div key={i} className={`thumbnail${activeImg===i?" active":""}`} style={{background:img.bg}} onClick={()=>setActiveImg(i)}>
                    <div className="thumb-text">{img.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="product-details">
              <div className="product-tag">THREADLY ESSENTIALS</div>
              <h1 className="product-title">Signature Oversized Organic Hoodie</h1>
              <div className="product-rating-detail">
                <div className="stars-large">★★★★★</div>
                <span className="reviews-count">(124 Reviews)</span>
              </div>
              <div className="price-section">
                <span className="current-price">$72.00</span>
                <span className="original-price">$110.00</span>
                <span className="discount-badge">-34% 🔥</span>
              </div>
              <p className="product-description">
                Elevated everyday wear. This hoodie is constructed from our custom 480GSM heavyweight loopback cotton, featuring a refined architectural silhouette and a structured double-layer hood.
              </p>

              <div className="color-selector">
                <h3>COLOR — <span id="selectedColor">{selectedColor}</span></h3>
                <div className="color-options">
                  {[["OBSIDIAN BLACK","#2F3E46"],["CLOUD GREY","#CAD2C5"],["FOREST GREEN","#52796F"]].map(([name,bg])=>(
                    <button key={name} className={`color-option${selectedColor===name?" active":""}`} data-color={name} style={{background:bg}} onClick={()=>setSelectedColor(name)}/>
                  ))}
                </div>
              </div>

              <div className="size-selector">
                <div className="size-header">
                  <h3>SELECT SIZE</h3>
                  <a href="#" className="size-guide">FIND YOUR FIT</a>
                </div>
                <div className="size-options">
                  {["S","M","L","XL"].map(s=>(
                    <button key={s} className={`size-option${selectedSize===s?" active":""}`} onClick={()=>setSelectedSize(s)}>{s}</button>
                  ))}
                </div>
              </div>

              <div className="action-buttons">
                <button className="add-to-cart-btn" onClick={()=>{
                  addItem({id:4,name:"Signature Oversized Organic Hoodie",price:72,bg:images[activeImg].bg,placeholder:"ORGANIC HOODIE"});
                  show("Added to cart! 🎉","success");
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  ADD TO CART
                </button>
                <button className="wishlist-btn-large" onClick={()=>{setWishlisted(!wishlisted);show(wishlisted?"Removed from wishlist":"Added to wishlist ❤️","info");}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted?"currentColor":"none"} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  WISHLIST
                </button>
              </div>

              <div className="product-specs">
                <details open>
                  <summary>PRODUCT SPECIFICATIONS</summary>
                  <div className="specs-content">
                    <div className="spec-row"><span className="spec-label">Fabric</span><span className="spec-value">100% Organic Cotton</span></div>
                    <div className="spec-row"><span className="spec-label">Weight</span><span className="spec-value">Heavyweight 480GSM</span></div>
                    <div className="spec-row"><span className="spec-label">Fitting</span><span className="spec-value">True to size (Oversized)</span></div>
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

          <section className="style-with-this">
            <h2>Style With This</h2>
            <p className="section-subtitle">Curated pairings by Threadly stylists</p>
            <div className="recommendations-grid">
              {[
                {bg:"linear-gradient(135deg,#CAD2C5 0%,#84A98C 100%)",ph:"CANVAS\nTROUSER",name:"Structured Canvas Trouser",price:"$120.00"},
                {bg:"linear-gradient(135deg,#84A98C 0%,#52796F 100%)",ph:"WOOL\nBEANIE",name:"Merino Wool Beanie",price:"$45.00"},
                {bg:"linear-gradient(135deg,#fff 0%,#CAD2C5 100%)",ph:"BODY\nTEE",name:"Heavy Body Tee",price:"$55.00"},
                {bg:"linear-gradient(135deg,#2F3E46 0%,#354F52 100%)",ph:"SHELL\nPARKA",name:"Tech Shell Parka",price:"$210.00"},
              ].map(r=>(
                <div key={r.name} className="recommendation-card">
                  <div className="rec-image" style={{background:r.bg}}>
                    <div className="rec-placeholder">{r.ph}</div>
                  </div>
                  <h4>{r.name}</h4>
                  <p className="rec-price">{r.price}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section"><h3>THREADLY</h3><p>Architectural design essentials through uncompromising quality. Built for the longevity of your wardrobe since 2023.</p></div>
          <div className="footer-section"><h4>SHOP</h4><ul><li><a href="#">New Drops</a></li><li><a href="#">Best Sellers</a></li><li><a href="#">Sale Archives</a></li></ul></div>
          <div className="footer-section"><h4>HELP</h4><ul><li><a href="#">Track Order</a></li><li><a href="#">Returns Portal</a></li><li><a href="#">Sizing Guide</a></li></ul></div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 THREADLY. ALL RIGHTS RESERVED.</p>
          <div className="footer-links">
            <a href="#">PRIVACY</a><a href="#">TERMS</a><a href="#">ACCESSIBILITY</a>
          </div>
        </div>
      </footer>
    </>
  );
}
