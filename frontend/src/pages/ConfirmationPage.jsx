import { useCart } from "../context/index.jsx";

const fmt = (n) => `$${Number(n).toFixed(2)}`;

export default function ConfirmationPage({ navigate, route }) {
  const { clearCart } = useCart();
  const order = route?.orderData || null;

  const handleContinue = () => {
    clearCart();
    navigate("home");
  };

  if (!order) {
    return (
      <>
        <nav className="navbar simple">
          <div className="nav-container">
            <div className="logo">
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("home"); }}>THREADLY</a>
            </div>
          </div>
        </nav>

        <main className="confirmation-page">
          <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
            <h2>No order found</h2>
            <p style={{ margin: "1rem 0", color: "var(--color-text-light)" }}>
              Your confirmation data is missing.
            </p>
            <button className="primary-action-btn" onClick={() => navigate("home")}>
              CONTINUE SHOPPING
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <nav className="navbar simple">
        <div className="nav-container">
          <div className="logo">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("home"); }}>THREADLY</a>
          </div>
          <ul className="nav-links">
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("home"); }}>Home</a></li>
          </ul>
        </div>
      </nav>

      <main className="confirmation-page">
        <div className="container">
          <div className="success-header">
            <div className="success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1>Thank you for shopping with Threadly!</h1>
            <p>Your order has been confirmed and is being prepared for shipment. Your style journey with us is just beginning.</p>
          </div>

          <div className="order-info-card">
            <div className="order-header">
              <div className="order-id-section">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <div>
                  <span className="label">THREADLY OFFICIAL</span>
                  <h2>Order #{order.orderCode}</h2>
                  <p className="order-date">Confirmed on {order.createdAt}</p>
                </div>
              </div>

              <span className="verified-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                VERIFIED TRANSACTION
              </span>
            </div>

            <div className="order-details-grid">
              <div className="detail-item">
                <span className="detail-label">STATUS</span>
                <span className="status-badge confirmed">● {order.status}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">ESTIMATED DELIVERY</span>
                <span className="detail-value">Available soon</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">PAYMENT</span>
                <span className="detail-value">{order.paymentMethod}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">TRACKING</span>
                <span className="tracking-link">Available Soon</span>
              </div>
            </div>
          </div>

          <section className="order-summary-section">
            <h2>ORDER SUMMARY</h2>
            <div className="ordered-items">
              {order.items.map((item) => (
                <div key={item.id} className="ordered-item">
                  <div className="item-image-wrap">
                    <div className="item-img-conf" style={{ backgroundColor: "var(--color-lightest)" }}>
                      {item.img ? (
                        <img
                          src={item.img}
                          alt={item.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
                        />
                      ) : (
                        <div className="img-text">{item.name}</div>
                      )}
                    </div>
                  </div>

                  <div className="item-details-conf">
                    <h3>{item.name}</h3>
                    <div className="item-meta">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.color && <span>Color: {item.color}</span>}
                    </div>
                  </div>

                  <div className="item-price-conf">
                    <span className="price">{fmt(item.price)}</span>
                    <span className="quantity">QTY: {item.qty}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pricing-breakdown">
              <div className="pricing-row"><span>Subtotal</span><span>{fmt(order.subtotal)}</span></div>
              <div className="pricing-row"><span>Shipping</span><span>{order.shippingAmount === 0 ? "FREE" : fmt(order.shippingAmount)}</span></div>
              <div className="pricing-row"><span>Estimated Tax</span><span>{fmt(order.tax)}</span></div>
              <div className="pricing-total"><span>TOTAL PAID</span><span className="total-amount">{fmt(order.total)}</span></div>
            </div>
          </section>

          <div className="delivery-info">
            <div className="info-column">
              <h3>SHIPPING ADDRESS</h3>
              <div className="address-card">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <div>
                  <p className="name">{order.shipping.firstName} {order.shipping.lastName}</p>
                  <p>{order.shipping.address}</p>
                  <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
                </div>
              </div>
            </div>

            <div className="info-column">
              <h3>NEED ASSISTANCE?</h3>
              <div className="support-card">
                <p>Our concierge team is available 24/7 to help with any questions regarding your Threadly order.</p>
                <a href="mailto:support@threadly.co" className="support-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  support@threadly.co
                </a>
              </div>
            </div>
          </div>

          <div className="actions-section">
            <button className="primary-action-btn" onClick={handleContinue}>
              CONTINUE SHOPPING
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
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