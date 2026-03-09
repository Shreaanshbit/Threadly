# Threadly — Premium Clothing E-Commerce

> Full-stack internship project · React + Vite · No external UI libraries

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Framework  | React 18                |
| Build tool | Vite 5                  |
| Styling    | Plain CSS (CSS Variables)|
| State      | React Context API        |
| Routing    | Custom state-based router|
| Storage    | localStorage (cart/auth) |

## Folder Structure

```
threadly/
├── index.html                  # App entry point
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                # ReactDOM.createRoot
    ├── App.jsx                 # Router (state-based navigation)
    ├── styles/
    │   ├── globals.css         # Variables, reset, animations, toast
    │   ├── store.css           # Navbar, hero, products, cart, checkout, confirmation, footer
    │   └── admin.css           # Admin login + dashboard
    ├── data/
    │   └── index.js            # All static mock data (products, orders, etc.)
    ├── context/
    │   └── index.jsx           # CartCtx, ToastCtx, AdminCtx providers + hooks
    ├── components/
    │   ├── Navbar.jsx          # Top navigation (store + simple variants)
    │   ├── Footer.jsx          # Footer (full + simple variants)
    │   ├── ProductCard.jsx     # Reusable product grid card
    │   └── ProgressSteps.jsx   # Cart / Shipping / Payment stepper
    └── pages/
        ├── HomePage.jsx        # Product listing + sidebar filters
        ├── ProductDetailPage.jsx  # Product gallery + size/color selector
        ├── CartPage.jsx        # Cart items + order summary
        ├── CheckoutPage.jsx    # Delivery form + payment options
        ├── ConfirmationPage.jsx # Order confirmation
        └── admin/
            ├── AdminLoginPage.jsx   # Admin login form
            └── AdminDashboard.jsx   # Stats + product form + order tracking
```

## Pages

| Route key          | Description                        |
|--------------------|------------------------------------|
| `home`             | Product listing with filters       |
| `product`          | Product detail (gallery + buy)     |
| `cart`             | Shopping bag                       |
| `checkout`         | Delivery + payment form            |
| `confirmation`     | Order success screen               |
| `admin-login`      | Admin authentication               |
| `admin-dashboard`  | Admin panel (products + orders)    |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

## Admin Access

Navigate to `admin-login` via the footer **Admin Portal** link, or change the page state in `App.jsx`.

- **Email:** any valid email
- **Password:** any non-empty string

> In a real app, replace the mock auth in `context/index.jsx` with a real API call.

## Color Palette

| Variable        | Hex       | Usage               |
|-----------------|-----------|---------------------|
| `--primary`     | `#2F3E46` | Buttons, text, nav  |
| `--secondary`   | `#354F52` | Hover states        |
| `--accent`      | `#52796F` | Badges, icons       |
| `--light-green` | `#84A98C` | Status, accents     |
| `--lightest`    | `#CAD2C5` | Backgrounds, tags   |

## Scripts

```bash
npm run dev      # Development server (HMR)
npm run build    # Production build → /dist
npm run preview  # Preview production build
```

---

Built with ❤️ for the Threadly internship project — 2024
