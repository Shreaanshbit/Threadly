import { useCart } from "../context/index.jsx";
import { useToast } from "../context/index.jsx";

const fmt = n => `$${Number(n).toFixed(2)}`;

export default function CartPage({ navigate }) {
  const { cart, subtotal, shipping, tax, total, updateQty, removeItem, clearCart } = useCart();
  const show = useToast();

  return (
    <>
      {/* Exact navbar from cart.html */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo"><a href="#" onClick={e=>{e.preventDefault();navigate("home");}}>THREADLY</a></div>
          <ul className="nav-links">
            <li><a href="#">New Arrivals</a></li><li><a href="#">Men</a></li>
            <li><a href="#">Women</a></li><li><a href="#">Accessories</a></li>
          </ul>
          <div className="nav-icons">
            <a href="#search" className="icon-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></a>
            <a href="#" className="icon-btn cart-icon" onClick={e=>{e.preventDefault();navigate("cart");}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <span className="cart-count">{cart.reduce((s,i)=>s+i.qty,0)}</span>
            </a>
            <a href="#profile" className="icon-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></a>
          </div>
        </div>
      </nav>

      {/* Exact progress steps from cart.html */}
      <div className="cart-progress">
        <div className="progress-container">
          <div className="progress-step active">
            <div className="step-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <span>CART</span>
          </div>
          <div className="progress-step"><div className="step-icon">02</div><span>SHIPPING</span></div>
          <div className="progress-step"><div className="step-icon">03</div><span>PAYMENT</span></div>
        </div>
      </div>

      <main className="cart-page">
        <div className="container">
          <div className="cart-layout">

            <div className="cart-items-section">
              <div className="cart-header">
                <h1>Review Your Order</h1>
                <p>You have <strong>{cart.length} items</strong> in your Threadly bag.</p>
                <button className="clear-bag-btn" onClick={()=>{clearCart();show("Bag cleared","info");}}>Clear Bag</button>
              </div>

              <div className="cart-items" id="cartItems">
                {cart.map(item=>(
                  <div key={item.id} className="cart-item" data-id={item.id}>
                    <div className="item-image" style={{background:item.bg}}>
                      <div className="item-placeholder">{item.placeholder}</div>
                    </div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      {item.sku && <p className="item-sku">STYLE #{item.sku}</p>}
                      <div className="item-variants">
                        {item.color && <span className="variant-tag">{item.color}</span>}
                        {item.size  && <span className="variant-tag">Size: {item.size}</span>}
                      </div>
                    </div>
                    <div className="item-price">
                      <span className="price-label">{fmt(item.price)}</span>
                      <span className="stock-status">IN STOCK</span>
                    </div>
                    <div className="item-quantity">
                      <button className="qty-btn" onClick={()=>updateQty(item.id,-1)}>−</button>
                      <input type="number" value={item.qty} min="1" className="qty-input" readOnly/>
                      <button className="qty-btn" onClick={()=>updateQty(item.id,1)}>+</button>
                    </div>
                    <div className="item-actions">
                      <button className="action-icon" title="Save for later">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      </button>
                      <button className="action-icon" title="Remove" onClick={()=>{removeItem(item.id);show(`${item.name} removed`,"info");}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="shipping-promo">
                <div className="promo-content">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                  <div>
                    <h3>Free Express Shipping</h3>
                    <p>Add {fmt(Math.max(0,100-subtotal))} more to qualify for priority delivery!</p>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width:`${Math.min(100,(subtotal/100)*100)}%`}}/>
                </div>
              </div>

              <section className="style-recommendations">
                <h2>STYLE RECOMMENDATIONS</h2>
                <p className="subtitle">Curated essentials to complete your look.</p>
                <div className="recommendations-scroll">
                  {[
                    {bg:"linear-gradient(135deg,#CAD2C5 0%,#84A98C 100%)",text:"RAIN\nJACKET",name:"Lightweight Rain Jacket",cat:"OUTERWEAR",price:"$65.00"},
                    {bg:"linear-gradient(135deg,#354F52 0%,#52796F 100%)",text:"SELVEDGE\nDENIM",name:"Slim-fit Selvedge Denim",cat:"BOTTOMS",price:"$79.00"},
                    {bg:"linear-gradient(135deg,#2F3E46 0%,#354F52 100%)",text:"AVIATOR\nSUNGLASS",name:"Aviator Sunglasses",cat:"ACCESSORIES",price:"$45.00"},
                    {bg:"linear-gradient(135deg,#84A98C 0%,#CAD2C5 100%)",text:"FLEECE\nHOODIE",name:"Fleece Oversized Hoodie",cat:"ESSENTIALS",price:"$58.00"},
                  ].map(r=>(
                    <div key={r.name} className="rec-card">
                      <div className="rec-img" style={{background:r.bg}}><div className="rec-text">{r.text}</div></div>
                      <h4>{r.name}</h4>
                      <p className="rec-category">{r.cat}</p>
                      <p className="rec-price">{r.price}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="order-summary">
              <h2>ORDER SUMMARY</h2>
              <div className="summary-row"><span>Subtotal ({cart.length} items)</span><span id="subtotal">{fmt(subtotal)}</span></div>
              <div className="summary-row"><span>Estimated Shipping</span><span id="shipping">{shipping===0?"FREE":fmt(shipping)}</span></div>
              <div className="summary-row"><span>Estimated Tax</span><span id="tax">{fmt(tax)}</span></div>
              <div className="summary-divider"/>
              <div className="summary-total"><span>TOTAL AMOUNT</span><span id="total">{fmt(total)}</span></div>
              <button className="checkout-btn" onClick={()=>navigate("checkout")}>
                PROCEED TO CHECKOUT
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              <button className="continue-shopping" onClick={()=>navigate("home")}>Continue Shopping</button>
              <div className="promo-code">
                <h3>ACCEPTED PAYMENTS</h3>
                <div className="payment-icons">
                  <div className="payment-badge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    SSL SECURE
                  </div>
                </div>
              </div>
              <div className="guarantees">
                <div className="guarantee-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>QUALITY ASSURED</span>
                </div>
                <div className="guarantee-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  <span>30-DAY RETURNS</span>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section"><h3>THREADLY</h3><p>Premium craftsmanship for the modern wardrobe. Redefining timeless style since 2023.</p></div>
          <div className="footer-section"><h4>SHOP</h4><ul><li><a href="#">New Arrivals</a></li><li><a href="#">Men's Collection</a></li><li><a href="#">Premium Accessories</a></li></ul></div>
          <div className="footer-section"><h4>SUPPORT</h4><ul><li><a href="#">Track My Order</a></li><li><a href="#">Shipping &amp; Returns</a></li><li><a href="#">Size Guide</a></li><li><a href="#">Contact Support</a></li></ul></div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 THREADLY INC. WORLDWIDE.</p>
          <div className="footer-links"><a href="#">PRIVACY</a><a href="#">TERMS</a><a href="#">ACCESSIBILITY</a></div>
        </div>
      </footer>
    </>
  );
}
