import { useState } from "react";
import { useAdmin } from "../../context/index.jsx";

const ORDERS = [
  { id:"#TH-9410", time:"Just now",     initials:"JW", customer:"James Wilson", amount:"$189.99", status:"● Delivered",  statusClass:"delivered" },
  { id:"#TH-9409", time:"12 mins ago",  initials:"SA", customer:"Sarah Adams",  amount:"$42.00",  status:"● In Transit", statusClass:"transit" },
  { id:"#TH-9408", time:"35 mins ago",  initials:"RK", customer:"Robert King",  amount:"$210.50", status:"● Packaging",  statusClass:"packaging" },
];

export default function AdminDashboard({ navigate }) {
  const { logout } = useAdmin();
  const [activeNav, setActiveNav] = useState("products");

  // Original uses <body class="admin-dashboard"> — we wrap in a div
  return (
    <div className="admin-dashboard">

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
          <a href="#" className="nav-item" onClick={e=>e.preventDefault()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Customers
          </a>
          <a href="#" className="nav-item" onClick={e=>e.preventDefault()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            Reports
          </a>
          <a href="#" className="nav-item" onClick={e=>e.preventDefault()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            Marketing
          </a>
        </nav>

        <div className="sidebar-footer">
          <a href="#" className="nav-item" onClick={e=>e.preventDefault()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m5.66-13.66l-4.24 4.24m0 6l-4.24 4.24M23 12h-6m-6 0H1m17.66 5.66l-4.24-4.24m0-6l-4.24-4.24"/></svg>
            System Settings
          </a>
          <div className="admin-user">
            <div className="user-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div className="user-info">
              <span className="user-name">Internal Team</span>
              <span className="user-role">ADMIN ACCESS</span>
            </div>
            <button className="logout-btn" onClick={()=>{logout();navigate("home");}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div><h1>Commerce Control</h1><p>Overseeing Threadly's inventory and order lifecycles.</p></div>
          <div className="header-actions">
            <div className="search-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input type="text" placeholder="Search SKU, Order #, or User..."/>
            </div>
            <button className="notification-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </button>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon green"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
            <div className="stat-content"><span className="stat-label">NET REVENUE</span><h2 className="stat-value">$24,482.00</h2><span className="stat-change positive">+12.4%</span></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon yellow"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg></div>
            <div className="stat-content"><span className="stat-label">ACTIVE ORDERS</span><h2 className="stat-value">62</h2><span className="stat-badge">Active</span></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></div>
            <div className="stat-content"><span className="stat-label">CATALOG ITEMS</span><h2 className="stat-value">312</h2><span className="stat-badge">30 New</span></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
            <div className="stat-content"><span className="stat-label">STORE CONVERSION</span><h2 className="stat-value">4.5%</h2><span className="stat-change positive">+8.2%</span></div>
          </div>
        </div>

        <div className="dashboard-grid">

          <section className="dashboard-card product-management">
            <div className="card-header">
              <div className="header-title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                <div><h3>Product Management</h3><span>NEW LISTING CREATOR</span></div>
              </div>
            </div>
            <form className="product-form">
              <div className="form-field"><label>PRODUCT LABEL</label><input type="text" placeholder="Urban Knit Sweatshirt" defaultValue="Urban Knit Sweatshirt"/></div>
              <div className="form-row">
                <div className="form-field"><label>COLLECTION</label><select><option>Outerwear</option><option>Essentials</option><option>Denim</option></select></div>
                <div className="form-field"><label>MSRP ($)</label><input type="number" placeholder="0.00" defaultValue="0.00"/></div>
              </div>
              <div className="form-row">
                <div className="form-field"><label>INITIAL STOCK</label><input type="text" placeholder="Quantity"/></div>
                <div className="form-field"><label>PROMO CODE</label><input type="text" placeholder="e.g. EARLY20"/></div>
              </div>
              <div className="form-field"><label>MARKETING COPY</label><textarea placeholder="Describe the fit and material..." rows="3"/></div>
              <div className="form-field">
                <label>PRODUCT MEDIA</label>
                <div className="upload-area">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <p>Upload assets or <a href="#">browse files</a></p>
                  <span>High-quality PNG or JPG (Max 5MB)</span>
                </div>
              </div>
              <button type="button" className="publish-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                Publish to Store
              </button>
            </form>
          </section>

          <section className="dashboard-card order-tracking">
            <div className="card-header">
              <div className="header-title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                <div><h3>Order Tracking</h3><span>FULFILLMENT PIPELINE</span></div>
              </div>
              <div className="card-actions">
                <button className="export-btn">Export Logs</button>
                <button className="history-btn">See History</button>
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
              {ORDERS.map(o=>(
                <div key={o.id} className="order-row">
                  <span className="order-id"><strong>{o.id}</strong><small>{o.time}</small></span>
                  <div className="customer-info"><div className="customer-avatar">{o.initials}</div><span>{o.customer}</span></div>
                  <span className="order-amount">{o.amount}</span>
                  <span className={`order-status ${o.statusClass}`}>{o.status}</span>
                  <div className="order-actions">
                    <button className="action-icon-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>
                    <button className="action-icon-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg></button>
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
              <button className="manage-stock-btn">Manage Stock</button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
