import { useState } from "react";
import { useAdmin } from "../../context/index.jsx";
import { useToast } from "../../context/index.jsx";

const ORDERS = [
  { id:"#TH-9410", time:"Just now",    initials:"JW", customer:"James Wilson", amount:"$189.99", status:"● Delivered",  statusClass:"delivered" },
  { id:"#TH-9409", time:"12 mins ago", initials:"SA", customer:"Sarah Adams",  amount:"$42.00",  status:"● In Transit", statusClass:"transit" },
  { id:"#TH-9408", time:"35 mins ago", initials:"RK", customer:"Robert King",  amount:"$210.50", status:"● Packaging",  statusClass:"packaging" },
];

const STATS = [
  { label:"NET REVENUE",      value:"$24,482.00", extra:<span className="stat-change positive">+12.4%</span>,   colorClass:"green",  icon:"dollar" },
  { label:"ACTIVE ORDERS",    value:"62",          extra:<span className="stat-badge">Active</span>,            colorClass:"yellow", icon:"orders" },
  { label:"CATALOG ITEMS",    value:"312",          extra:<span className="stat-badge">30 New</span>,           colorClass:"blue",   icon:"catalog" },
  { label:"STORE CONVERSION", value:"4.5%",         extra:<span className="stat-change positive">+8.2%</span>, colorClass:"red",    icon:"activity" },
];

function StatIcon({ name }) {
  if (name === "dollar")   return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
  if (name === "orders")   return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>;
  if (name === "catalog")  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
}

export default function AdminDashboard({ navigate }) {
  const { logout } = useAdmin();
  const show = useToast();
  const [activeNav, setActiveNav] = useState("products");
  const [productName, setProductName] = useState("Urban Knit Sweatshirt");
  const [collection,  setCollection]  = useState("Outerwear");
  const [price,       setPrice]       = useState("0.00");
  const [stock,       setStock]       = useState("");
  const [promo,       setPromo]       = useState("");
  const [desc,        setDesc]        = useState("");

  const handlePublish = () => {
    if (!productName || !price) { show("Please fill in product name and price", "error"); return; }
    show(`"${productName}" published to store! ✓`, "success");
  };

  const handleLogout = () => { logout(); navigate("home"); };

  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="admin-brand">
            <div className="brand-icon">T</div>
            <div><h3>THREADLY</h3><span>OPERATIONS</span></div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className={`nav-item${activeNav==="dashboard"?" active":""}`} onClick={e=>{e.preventDefault();setActiveNav("dashboard");}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Dashboard
          </a>
          <a href="#" className={`nav-item${activeNav==="products"?" active":""}`} onClick={e=>{e.preventDefault();setActiveNav("products");}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Products
          </a>
          <a href="#" className={`nav-item${activeNav==="orders"?" active":""}`} onClick={e=>{e.preventDefault();setActiveNav("orders");}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Orders
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-user">
            <div className="user-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div className="user-info">
              <span className="user-name">Internal Team</span>
              <span className="user-role">ADMIN ACCESS</span>
            </div>
            <button className="logout-btn" onClick={handleLogout} title="Logout">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <header className="admin-header">
          <div><h1>Commerce Control</h1><p>Overseeing Threadly's inventory and order lifecycles.</p></div>
          <div className="header-actions">
            <div className="search-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input type="text" placeholder="Search SKU, Order #, or User..." />
            </div>
            <button className="return-to-store-btn" onClick={() => navigate("home")} style={{ padding:"0.6rem 1.2rem", background:"var(--color-accent)", color:"white", border:"none", borderRadius:"6px", cursor:"pointer", fontSize:"0.85rem", fontWeight:600, fontFamily:"inherit" }}>
              ← View Store
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="stats-grid">
          {STATS.map(s => (
            <div key={s.label} className="stat-card">
              <div className={`stat-icon ${s.colorClass}`}><StatIcon name={s.icon} /></div>
              <div className="stat-content">
                <span className="stat-label">{s.label}</span>
                <h2 className="stat-value">{s.value}</h2>
                {s.extra}
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">

          {/* Product Management */}
          <section className="dashboard-card product-management">
            <div className="card-header">
              <div className="header-title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                <div><h3>Product Management</h3><span>NEW LISTING CREATOR</span></div>
              </div>
            </div>
            <form className="product-form" onSubmit={e => { e.preventDefault(); handlePublish(); }}>
              <div className="form-field">
                <label>PRODUCT LABEL</label>
                <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Urban Knit Sweatshirt" required />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>COLLECTION</label>
                  <select value={collection} onChange={e => setCollection(e.target.value)}>
                    <option>Outerwear</option><option>Essentials</option><option>Denim</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>MSRP ($)</label>
                  <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" min="0" step="0.01" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>INITIAL STOCK</label>
                  <input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="Quantity" min="0" />
                </div>
                <div className="form-field">
                  <label>PROMO CODE</label>
                  <input type="text" value={promo} onChange={e => setPromo(e.target.value)} placeholder="e.g. EARLY20" />
                </div>
              </div>
              <div className="form-field">
                <label>MARKETING COPY</label>
                <textarea value={desc} onChange={e => setDesc(e.target.value)} rows="3" placeholder="Describe the fit and material..." />
              </div>
              <div className="form-field">
                <label>PRODUCT MEDIA</label>
                <div className="upload-area" onClick={() => show("File upload not available in demo", "info")} style={{ cursor:"pointer" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <p>Upload assets or <a href="#" onClick={e=>e.preventDefault()}>browse files</a></p>
                  <span>High-quality PNG or JPG (Max 5MB)</span>
                </div>
              </div>
              <button type="submit" className="publish-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                Publish to Store
              </button>
            </form>
          </section>

          {/* Order Tracking */}
          <section className="dashboard-card order-tracking">
            <div className="card-header">
              <div className="header-title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                <div><h3>Order Tracking</h3><span>FULFILLMENT PIPELINE</span></div>
              </div>
              <div className="card-actions">
                <button className="export-btn" onClick={() => show("Export downloaded ✓", "success")}>Export Logs</button>
              </div>
            </div>

            <div className="orders-table">
              <div className="table-header">
                <span className="col-id">ID</span>
                <span className="col-customer">CUSTOMER</span>
                <span className="col-amount">AMOUNT</span>
                <span className="col-status">STATUS</span>
                <span className="col-actions">ACTIONS</span>
              </div>
              {ORDERS.map(o => (
                <div key={o.id} className="order-row">
                  <span className="order-id"><strong>{o.id}</strong><small>{o.time}</small></span>
                  <div className="customer-info"><div className="customer-avatar">{o.initials}</div><span>{o.customer}</span></div>
                  <span className="order-amount">{o.amount}</span>
                  <span className={`order-status ${o.statusClass}`}>{o.status}</span>
                  <div className="order-actions">
                    <button className="action-icon-btn" onClick={() => show(`Viewing order ${o.id}`, "info")}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                    <button className="action-icon-btn" onClick={() => show(`Printing order ${o.id}`, "info")}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="trending-product">
              <div className="trending-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                TRENDING
              </div>
              <div className="trending-content">
                <span className="trending-label">Top Performing SKU</span>
                <h4>Premium Blue Denim</h4>
                <p>High velocity item • Low inventory alert (8 units)</p>
              </div>
              <button className="manage-stock-btn" onClick={() => show("Stock management coming soon", "info")}>Manage Stock</button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
