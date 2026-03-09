import { useCart } from "../context/index.jsx";

export default function ConfirmationPage({ navigate }) {
  const { clearCart } = useCart();

  const handleContinue = () => {
    clearCart();
    navigate("home");
  };

  return (
    <>
      <nav className="navbar simple">
        <div className="nav-container">
          <div className="logo"><a href="#" onClick={e=>{e.preventDefault();navigate("home");}}>THREADLY</a></div>
          <ul className="nav-links">
            <li><a href="#" onClick={e=>{e.preventDefault();navigate("home");}}>Home</a></li>
          </ul>
        </div>
      </nav>

      <main className="confirmation-page">
        <div className="container">

          <div className="success-header">
            <div className="success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h1>Thank you for shopping with Threadly!</h1>
            <p>Your order has been confirmed and is being prepared for shipment. Your style journey with us is just beginning.</p>
          </div>

          <div className="order-info-card">
            <div className="order-header">
              <div className="order-id-section">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                <div>
                  <span className="label">THREADLY OFFICIAL</span>
                  <h2>Order #THRD-9283401</h2>
                  <p className="order-date">Confirmed on Oct 24, 2023 at 02:45 PM</p>
                </div>
              </div>
              <span className="verified-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                VERIFIED TRANSACTION
              </span>
            </div>
            <div className="order-details-grid">
              <div className="detail-item"><span className="detail-label">STATUS</span><span className="status-badge confirmed">● Confirmed</span></div>
              <div className="detail-item"><span className="detail-label">ESTIMATED DELIVERY</span><span className="detail-value">Oct 28 – Oct 30</span></div>
              <div className="detail-item"><span className="detail-label">PAYMENT</span><span className="detail-value">Cash on Delivery</span></div>
              <div className="detail-item"><span className="detail-label">TRACKING</span><span className="tracking-link">Available Soon</span></div>
            </div>
          </div>

          <section className="order-summary-section">
            <h2>ORDER SUMMARY</h2>
            <div className="ordered-items">
              {[
                { bg:"linear-gradient(135deg,#2F3E46 0%,#354F52 100%)", text:"ESSENTIAL\nJACKET", name:"Classic Essential Jacket", meta:["Size: Medium","Color: Navy Blue"],  price:"$89.00",  qty:"01" },
                { bg:"linear-gradient(135deg,#CAD2C5 0%,#fff 100%)",    text:"COTTON\nTEE",      name:"Premium Cotton Tee",      meta:["Size: Medium","Color: Bone White"], price:"$64.00", qty:"02" },
              ].map(item => (
                <div key={item.name} className="ordered-item">
                  <div className="item-image-wrap">
                    <div className="item-img-conf" style={{ background: item.bg }}><div className="img-text">{item.text}</div></div>
                  </div>
                  <div className="item-details-conf">
                    <h3>{item.name}</h3>
                    <div className="item-meta">{item.meta.map(m => <span key={m}>{m}</span>)}</div>
                  </div>
                  <div className="item-price-conf">
                    <span className="price">{item.price}</span>
                    <span className="quantity">QTY: {item.qty}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pricing-breakdown">
              <div className="pricing-row"><span>Subtotal</span><span>$153.00</span></div>
              <div className="pricing-row"><span>Shipping (Premium Express)</span><span>$12.00</span></div>
              <div className="pricing-row"><span>Estimated Tax</span><span>$9.18</span></div>
              <div className="pricing-total"><span>TOTAL PAID</span><span className="total-amount">$174.18</span></div>
            </div>
          </section>

          <div className="delivery-info">
            <div className="info-column">
              <h3>SHIPPING ADDRESS</h3>
              <div className="address-card">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <div><p className="name">Alex Weaver</p><p>123 Industrial Way, Suite 4B</p><p>Brooklyn, NY 11211, USA</p></div>
              </div>
            </div>
            <div className="info-column">
              <h3>NEED ASSISTANCE?</h3>
              <div className="support-card">
                <p>Our concierge team is available 24/7 to help with any questions regarding your Threadly order.</p>
                <a href="mailto:support@threadly.co" className="support-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  support@threadly.co
                </a>
              </div>
            </div>
          </div>

          <div className="actions-section">
            <button className="primary-action-btn" onClick={handleContinue}>
              CONTINUE SHOPPING
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

        </div>
      </main>

      <footer className="footer">
        <div className="footer-simple">
          <p>© 2024 THREADLY CLOTHING CO. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </>
  );
}
