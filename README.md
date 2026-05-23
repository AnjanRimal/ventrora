# Ventrora — Luxury Fragrance Website

A production-ready luxury fragrance brand website inspired by Creed, Dior Sauvage, and leading perfume houses.

## Features
- Animated hero with 3-slide carousel (auto-advances every 6s)
- Full collection page with filter + sort
- Individual product pages with scent pyramid, size selector, "Add to Bag"
- Brand story / Our Maison page with timeline
- Newsletter signup
- Fully responsive (mobile, tablet, desktop)
- White luxury theme with gold accents

## Tech Stack
- React 18 + React Router v6
- Vite
- Pure CSS (no UI library — fully custom)
- Google Fonts (Cormorant Garamond + Montserrat)

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:5173

## Deploy to Vercel

### Option 1 — Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

### Option 2 — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project
3. Import your GitHub repo
4. Framework: Vite (auto-detected)
5. Click Deploy ✓

No environment variables needed. The `vercel.json` handles SPA routing.

## Build for production
```bash
npm run build
```
Output in `/dist` — ready to serve on any static host.

## Pages
| Route | Description |
|---|---|
| `/` | Home — hero slider, collection grid, featured product |
| `/collections` | All fragrances with filter & sort |
| `/collections/:id` | Product detail (noir, lumiere, obsidian, seraphine, maison-duo) |
| `/story` | Brand story, timeline, values |
