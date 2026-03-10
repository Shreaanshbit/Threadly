import { createContext, useContext, useState, useEffect, useCallback } from "react";

// Toast
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
        <div
          id="notification"
          style={{
            position: "fixed",
            top: "100px",
            right: "2rem",
            background: "white",
            padding: "1rem 1.5rem",
            borderRadius: "8px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            fontFamily: "inherit",
            fontWeight: 500,
            fontSize: "0.9rem",
            borderLeft: `4px solid ${
              toast.type === "success"
                ? "#28a745"
                : toast.type === "error"
                ? "#dc3545"
                : "var(--color-accent)"
            }`,
            animation: "slideInNotif 0.3s ease-out"
          }}
        >
          <span
            style={{
              color:
                toast.type === "success"
                  ? "#28a745"
                  : toast.type === "error"
                  ? "#dc3545"
                  : "var(--color-accent)"
            }}
          >
            {toast.type === "success" ? "✓" : toast.type === "error" ? "✕" : "ℹ"}
          </span>
          {toast.msg}
        </div>
      )}
      <style>{`@keyframes slideInNotif{from{transform:translateX(400px);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);

// Cart
const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("tly_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tly_cart", JSON.stringify(cart));
  }, [cart]);

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 100 ? 0 : 8;
  const tax = +(subtotal * 0.05).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  const addItem = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.offer ?? product.price,
          qty: 1,
          img: product.img || "",
          cat: product.cat || "",
          stock: product.stock ?? 0
        }
      ];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartCtx.Provider
      value={{
        cart,
        totalQty,
        subtotal,
        shipping,
        tax,
        total,
        addItem,
        removeItem,
        updateQty,
        clearCart
      }}
    >
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => useContext(CartCtx);

// Admin
const AdminCtx = createContext(null);

export function AdminProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("tly_admin_token") || "");
  const [isAdmin, setIsAdmin] = useState(() => !!localStorage.getItem("tly_admin_token"));

  const login = (jwtToken) => {
    localStorage.setItem("tly_admin_token", jwtToken);
    setToken(jwtToken);
    setIsAdmin(true);
  };

  const logout = () => {
    localStorage.removeItem("tly_admin_token");
    setToken("");
    setIsAdmin(false);
  };

  return (
    <AdminCtx.Provider value={{ isAdmin, token, login, logout }}>
      {children}
    </AdminCtx.Provider>
  );
}

export const useAdmin = () => useContext(AdminCtx);