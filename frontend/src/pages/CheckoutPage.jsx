import { useState, useRef } from "react";
import { useToast, useCart } from "../context/index.jsx";

const fmt = (n) => `$${Number(n).toFixed(2)}`;

export default function CheckoutPage({ navigate }) {
  const show = useToast();
  const { cart, subtotal, shipping, tax, total } = useCart();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("cod");

  const completeOrder = () => {
    const form = formRef.current;

    if (!cart.length) {
      show("Your cart is empty", "error");
      return;
    }

    if (form && !form.checkValidity()) {
      form.reportValidity();
      show("Please fill in all required fields", "error");
      return;
    }

    const formData = new FormData(form);

    const shippingDetails = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zip: formData.get("zip"),
      phone: formData.get("phone"),
      email: formData.get("email")
    };

    const orderPayload = {
      orderCode: `THRD-${Date.now().toString().slice(-7)}`,
      createdAt: new Date().toLocaleString(),
      status: "Confirmed",
      paymentMethod: payment === "cod" ? "Cash on Delivery" : "Card",
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        qty: item.qty,
        price: item.price,
        color: item.color || "",
        size: item.size || "",
        img: item.img || ""
      })),
      shipping: shippingDetails,
      subtotal,
      shippingAmount: shipping,
      tax,
      total
    };

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("confirmation", { orderData: orderPayload });
    }, 1000);
  };

  if (!cart.length) {
    return (
      <>
        <nav className="navbar simple">
          <div className="nav-container">
            <div className="logo">
              <a href="#" onClick={(e) => { e.preventDefault(); navigate("home"); }}>THREADLY</a>
            </div>
          </div>
        </nav>

        <main className="checkout-page">
          <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
            <h2>Your cart is empty</h2>
            <p style={{ margin: "1rem 0", color: "var(--color-text-light)" }}>
              Add products before proceeding to checkout.
            </p>
            <button className="complete-order-btn" style={{ width: "auto", padding: "1rem 2rem" }} onClick={() => navigate("home")}>
              Continue Shopping
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
            <span className="checkout-label">STORE CHECKOUT</span>
          </div>
          <a href="#" className="return-link" onClick={(e) => { e.preventDefault(); navigate("cart"); }}>
            ← Return to Cart
          </a>
        </div>
      </nav>

      <div className="cart-progress">
        <div className="progress-container">
          <div className="progress-step completed"><div className="step-icon">✓</div><span>CART</span></div>
          <div className="progress-step active"><div className="step-icon">02</div><span>SHIPPING</span></div>
          <div className="progress-step"><div className="step-icon">03</div><span>PAYMENT</span></div>
        </div>
      </div>

      <main className="checkout-page">
        <div className="container">
          <div className="checkout-layout">
            <div className="checkout-form">
              <section className="form-section">
                <div className="section-header">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  <div>
                    <h2>Delivery Details</h2>
                    <p>Enter your destination to see available shipping methods and final taxes.</p>
                  </div>
                </div>

                <form id="checkoutForm" ref={formRef}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>FIRST NAME</label>
                      <input type="text" name="firstName" required />
                    </div>
                    <div className="form-group">
                      <label>LAST NAME</label>
                      <input type="text" name="lastName" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>STREET ADDRESS</label>
                    <input type="text" name="address" required />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>CITY</label>
                      <input type="text" name="city" required />
                    </div>
                    <div className="form-group">
                      <label>STATE</label>
                      <select name="state" required defaultValue="">
                        <option value="">Select State</option>
                        <option value="NY">New York (NY)</option>
                        <option value="CA">California (CA)</option>
                        <option value="TX">Texas (TX)</option>
                        <option value="FL">Florida (FL)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>ZIP CODE</label>
                      <input type="text" name="zip" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>PHONE NUMBER</label>
                      <div className="input-with-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <input type="tel" name="phone" required />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>EMAIL ADDRESS</label>
                      <div className="input-with-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <input type="email" name="email" required />
                      </div>
                    </div>
                  </div>
                </form>
              </section>

              <section className="form-section payment-section">
                <div className="section-header">
                  <h2>Payment Method</h2>
                  <p>Choose how you'd like to pay for your order.</p>
                  <span className="secure-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    SECURED
                  </span>
                </div>

                <div className="payment-options">
                  <label className="payment-option" style={{ borderColor: payment === "cod" ? "var(--color-accent)" : "", background: payment === "cod" ? "rgba(82,121,111,0.05)" : "" }}>
                    <input type="radio" name="payment" value="cod" checked={payment === "cod"} onChange={() => setPayment("cod")} />
                    <div className="option-content">
                      <div className="option-header">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="1" x2="12" y2="23" />
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <div>
                          <h4>Cash on Delivery</h4>
                          <p>Pay with cash when your package arrives</p>
                        </div>
                      </div>
                    </div>
                  </label>

                  <label className="payment-option disabled">
                    <input type="radio" name="payment" value="card" disabled />
                    <div className="option-content">
                      <div className="option-header">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                          <line x1="1" y1="10" x2="23" y2="10" />
                        </svg>
                        <div>
                          <h4>Credit Card</h4>
                          <p>Currently unavailable for your region</p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </section>
            </div>

            <aside className="order-summary-checkout">
              <h2>Your Selection</h2>
              <p className="items-count">{cart.length} ITEMS</p>

              <div className="checkout-items">
                {cart.map((item) => (
                  <div key={item.id} className="checkout-item">
                    <div className="item-img" style={{ backgroundColor: "var(--color-lightest)" }}>
                      {item.img ? (
                        <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} />
                      ) : (
                        <span className="item-qty">{item.qty}</span>
                      )}
                    </div>
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>{item.color ? item.color : ""} {item.size ? `• ${item.size}` : ""}</p>
                      <p className="item-price">{fmt(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-breakdown">
                <div className="summary-row"><span>SUBTOTAL</span><span>{fmt(subtotal)}</span></div>
                <div className="summary-row"><span>SHIPPING</span><span className={shipping === 0 ? "free-badge" : ""}>{shipping === 0 ? "FREE" : fmt(shipping)}</span></div>
                <div className="summary-row"><span>ESTIMATED TAX</span><span>{fmt(tax)}</span></div>
              </div>

              <div className="total-section">
                <div className="total-row">
                  <span>TOTAL</span>
                  <div className="total-amount">
                    <span className="amount">{fmt(total)}</span>
                    <span className="tax-note">USD INCLUDED TAX</span>
                  </div>
                </div>
              </div>

              <button className="complete-order-btn" onClick={completeOrder} disabled={loading}>
                {loading ? "Processing..." : "Complete Order"}
                {!loading && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </button>

              <div className="security-badges">
                <div className="badge-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>AES-256 ENCRYPTED SECURITY</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <footer className="footer simple">
        <div className="footer-simple">
          <p>© 2024 THREADLY CLOTHING CO. ALL RIGHTS RESERVED.</p>
          <p className="footer-tagline">MODERN FASHION EXCELLENCE • FULL-STACK INTERNSHIP PROJECT</p>
        </div>
      </footer>
    </>
  );
}