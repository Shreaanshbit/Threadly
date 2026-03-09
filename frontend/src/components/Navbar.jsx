import { useCart } from "../context/index.jsx";

// simple=false → full navbar (index.html style)
// simple=true  → checkout/confirmation minimal navbar
export default function Navbar({ navigate, simple=false, links=null }) {
  const { totalQty } = useCart();
  if (simple) {
    return (
      <nav className="navbar simple">
        <div className="nav-container">
          <div className="logo">
            <a href="#" onClick={e=>{e.preventDefault();navigate("home");}}>THREADLY</a>
            <span className="checkout-label">STORE CHECKOUT</span>
          </div>
          <a href="#" className="return-link" onClick={e=>{e.preventDefault();navigate("home");}}>← Return to Store</a>
        </div>
      </nav>
    );
  }
  const navLinks = links || [
    { label:"Home",       href:"home" },
    { label:"Categories", href:"home" },
    { label:"Cart",       href:"cart" },
    { label:"Orders",     href:"confirmation" },
  ];
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <a href="#" onClick={e=>{e.preventDefault();navigate("home");}}>Threadly</a>
        </div>
        <ul className="nav-links">
          {navLinks.map(l=>(
            <li key={l.label}>
              <a href="#" onClick={e=>{e.preventDefault();navigate(l.href);}}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-icons">
          <a href="#search" className="icon-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </a>
          <a href="#" className="icon-btn cart-icon" onClick={e=>{e.preventDefault();navigate("cart");}}>
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
  );
}
