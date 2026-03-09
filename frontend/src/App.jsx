import { useState } from "react";
import { ToastProvider, CartProvider, AdminProvider } from "./context/index.jsx";
import HomePage         from "./pages/HomePage.jsx";
import ProductPage      from "./pages/ProductPage.jsx";
import CartPage         from "./pages/CartPage.jsx";
import CheckoutPage     from "./pages/CheckoutPage.jsx";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";
import AdminLoginPage   from "./pages/admin/AdminLoginPage.jsx";
import AdminDashboard   from "./pages/admin/AdminDashboard.jsx";

const PAGES = { home:HomePage, product:ProductPage, cart:CartPage, checkout:CheckoutPage, confirmation:ConfirmationPage, "admin-login":AdminLoginPage, "admin-dashboard":AdminDashboard };

export default function App() {
  const [page, setPage] = useState("home");
  const navigate = key => { setPage(key); window.scrollTo(0,0); };
  const Page = PAGES[page] || HomePage;
  return (
    <AdminProvider>
      <CartProvider>
        <ToastProvider>
          <Page navigate={navigate} />
        </ToastProvider>
      </CartProvider>
    </AdminProvider>
  );
}
