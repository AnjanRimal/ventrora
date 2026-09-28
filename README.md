<h1 align="center">Ventrora — Luxury Fragrance House</h1>

<p align="center">
  A complete, multi-page e-commerce storefront for a luxury fragrance brand, built with React 18 and Vite.
</p>

<p align="center">
  <a href="https://ventrora.vercel.app"><strong>🌐 Live demo → ventrora.vercel.app</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-20232A?logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white" />
</p>

<!-- Tip: add a screenshot here, e.g. ![Ventrora home page](docs/screenshot-home.png) -->

## ✨ Features

- **Editorial home page** with a clean, white luxury aesthetic
- **Collections** laid out in a masonry editorial grid
- **Product detail** pages with thumbnail gallery and scent attributes
- **Slide-out cart drawer**, powered by a global `CartContext`
- **3-step checkout** with a live order summary, followed by an order-success page
- **Scent Finder quiz**: five questions that recommend fragrances
- **Wishlist** via `WishlistContext`; cart and wishlist both persist in `localStorage`
- **Accounts**: login, signup and a four-tab account dashboard
- **About** page with founder photos and quotes, plus a **Contact** page
- Fully responsive, with client-side routing via React Router

## 🗂️ Project structure

```
src/
├── components/   Navbar, Footer, CartDrawer
├── context/      CartContext, WishlistContext (global state)
├── data/         products.js (product catalogue)
├── pages/        Home, Collections, ProductDetail, Checkout, OrderSuccess,
│                 ScentFinder, Wishlist, Login, Signup, Account, About, Contact
├── styles/       globals.css
├── App.jsx       Routes
└── main.jsx      Entry point
public/           Product and founder photography
```

## 🚀 Run locally

```bash
git clone https://github.com/AnjanRimal/ventrora.git
cd ventrora
npm install
npm run dev          # http://localhost:5173
```

| Script | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |

## ☁️ Deploy

The site is deployed on **Vercel** (`vercel.json` handles SPA routing). To deploy your own copy on Vercel or Cloudflare Pages:

1. Import the repo
2. Build command: `npm run build`
3. Output directory: `dist`

## 🛣️ Roadmap

- [ ] **Shopify Storefront integration** for real products, inventory and checkout
  ```bash
  npm install shopify-buy
  ```
  ```env
  VITE_SHOPIFY_DOMAIN=ventrora.myshopify.com
  VITE_SHOPIFY_TOKEN=your_token_here
  ```
- [ ] Real authentication
- [ ] Lighthouse performance and accessibility pass

## 👤 Author
**Anjan Rimal** · [Portfolio](https://anjanrimal.com/) · [LinkedIn](https://www.linkedin.com/in/anjanrimal) · [GitHub](https://github.com/AnjanRimal)
