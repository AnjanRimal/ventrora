import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Collections from './pages/Collections'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Contact from './pages/Contact'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <ScrollTop />
        <Navbar />
        <CartDrawer />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
          </Routes>
        </main>
        <Footer />
      </WishlistProvider>
    </CartProvider>
  )
}
