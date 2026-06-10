# Ventrora — Luxury Fragrance House
React 18 + Vite | Complete E-commerce Website

## Pages Built
- Home (Option B — Clean White Editorial)
- Collections (Option C — Masonry Editorial)  
- Product Detail (Option B — Thumbnails + Attributes)
- Cart Drawer (Option B — Dark header + Burgundy)
- Checkout (3-step with order summary)
- Order Success
- About Us (Option D — Founder photos + quotes)
- Scent Finder Quiz (5 questions → recommendations)
- Wishlist
- Login / Signup
- Account (4 tabs)
- Footer (4 columns)

## Photos Included
All 7 bottle photos + 2 founder photos already in /public/

## Run Locally
npm install
npm run dev → http://localhost:5173

## Deploy to Vercel / Cloudflare Pages
1. Push to GitHub
2. Import repo on Vercel or Cloudflare Pages
3. Build command: npm run build
4. Output: dist

## Add Shopify Integration Later
npm install shopify-buy
Create .env:
  VITE_SHOPIFY_DOMAIN=ventrora.myshopify.com
  VITE_SHOPIFY_TOKEN=your_token_here
