import { createContext, useContext, useState, useEffect, useCallback } from "react";

// ── Toast ───────────────────────────────────────────────
const ToastCtx = createContext(null);
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const show = useCallback((msg, type = "info") => {
    setToast({ msg, type, id: Date.now() });
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      {toast && (
        <div id="notification" style={{
          position:"fixed",top:"100px",right:"2rem",
          background:"white",padding:"1rem 1.5rem",borderRadius:"8px",
          boxShadow:"0 8px 24px rgba(0,0,0,0.15)",zIndex:10000,
          display:"flex",alignItems:"center",gap:"0.8rem",
          fontFamily:"inherit",fontWeight:500,fontSize:"0.9rem",
          borderLeft:`4px solid ${toast.type==="success"?"#28a745":toast.type==="error"?"#dc3545":"var(--color-accent)"}`,
          animation:"slideInNotif 0.3s ease-out"
        }}>
          <span style={{color:toast.type==="success"?"#28a745":toast.type==="error"?"#dc3545":"var(--color-accent)"}}>
            {toast.type==="success"?"✓":toast.type==="error"?"✕":"ℹ"}
          </span>
          {toast.msg}
        </div>
      )}
      <style>{`@keyframes slideInNotif{from{transform:translateX(400px);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
    </ToastCtx.Provider>
  );
}
export const useToast = () => useContext(ToastCtx);

// ── Cart ────────────────────────────────────────────────
const INITIAL = [
  { id:1, name:"Premium Wool Blend Coat",      price:129, qty:1, sku:"TL-2048", color:"Navy Blue",   size:"Large",  bg:"linear-gradient(135deg,#2F3E46 0%,#354F52 100%)", placeholder:"WOOL COAT" },
  { id:2, name:"Organic Cotton Essential Tee", price:35,  qty:2, sku:"TL-1001", color:"Oatri White", size:"Medium", bg:"linear-gradient(135deg,#CAD2C5 0%,#fff 100%)",    placeholder:"COTTON TEE" },
  { id:3, name:"Sprint Pro Running Shoes",     price:89,  qty:1, sku:"FL-2003", color:"Velocity Red", size:"10",   bg:"linear-gradient(135deg,#84A98C 0%,#52796F 100%)",  placeholder:"RUNNING\nSHOES" },
];
const CartCtx = createContext(null);
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { const s = localStorage.getItem("tly_cart"); return s ? JSON.parse(s) : INITIAL; } catch { return INITIAL; }
  });
  useEffect(() => { localStorage.setItem("tly_cart", JSON.stringify(cart)); }, [cart]);
  const totalQty = cart.reduce((s,i)=>s+i.qty,0);
  const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const shipping = subtotal>100?0:8;
  const tax = +(subtotal*0.05).toFixed(2);
  const total = +(subtotal+shipping+tax).toFixed(2);
  const addItem = p => setCart(prev=>{const e=prev.find(i=>i.id===p.id);return e?prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...prev,{...p,qty:1}];});
  const removeItem = id => setCart(prev=>prev.filter(i=>i.id!==id));
  const updateQty = (id,delta) => setCart(prev=>prev.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+delta)}:i));
  const clearCart = () => setCart([]);
  return <CartCtx.Provider value={{cart,totalQty,subtotal,shipping,tax,total,addItem,removeItem,updateQty,clearCart}}>{children}</CartCtx.Provider>;
}
export const useCart = () => useContext(CartCtx);

// ── Admin ───────────────────────────────────────────────
const AdminCtx = createContext(null);
export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(()=>!!localStorage.getItem("tly_admin"));
  const login=(e,p)=>{if(e&&p){localStorage.setItem("tly_admin","1");setIsAdmin(true);return true;}return false;};
  const logout=()=>{localStorage.removeItem("tly_admin");setIsAdmin(false);};
  return <AdminCtx.Provider value={{isAdmin,login,logout}}>{children}</AdminCtx.Provider>;
}
export const useAdmin = () => useContext(AdminCtx);
