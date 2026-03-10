import { useState } from "react";
import { ToastProvider, CartProvider, AdminProvider } from "./context/index.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";
import AdminLoginPage from "./pages/admin/AdminLoginPage.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

const PAGES = {
  home: HomePage,
  product: ProductPage,
  cart: CartPage,
  checkout: CheckoutPage,
  confirmation: ConfirmationPage,
  "admin-login": AdminLoginPage,
  "admin-dashboard": AdminDashboard
};

export default function App() {
  const [route, setRoute] = useState({ name: "home" });

  const navigate = (name, params = {}) => {
    setRoute({ name, ...params });
    window.scrollTo(0, 0);
  };

  const Page = PAGES[route.name] || HomePage;

  return (
    <AdminProvider>
      <CartProvider>
        <ToastProvider>
          <Page navigate={navigate} route={route} />
        </ToastProvider>
      </CartProvider>
    </AdminProvider>
  );
}