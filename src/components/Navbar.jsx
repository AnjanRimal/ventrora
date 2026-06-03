import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, toggleCart } = useCart()
  const { items: wishItems } = useWishlist()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }, [location])

  const toggleMenu = () => {
    setMenuOpen(v => {
      document.body.style.overflow = !v ? 'hidden' : ''
      return !v
    })
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Announce bar */}
      <div className="announce">
        ✦ Complimentary shipping on orders over $150 &nbsp;·&nbsp; 30+ Perfume Palace stores across the US ✦
      </div>

      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">

          {/* Left links */}
          <nav className="navbar__left">
            <Link to="/collections" className={`navbar__link ${isActive('/collections') ? 'active' : ''}`}>Collections</Link>
            <Link to="/about" className={`navbar__link ${isActive('/about') ? 'active' : ''}`}>Our Story</Link>
            <Link to="/scent-finder" className={`navbar__link ${isActive('/scent-finder') ? 'active' : ''}`}>Scent Finder</Link>
          </nav>

          {/* Center logo */}
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-v">V</span>
            <span className="navbar__logo-name">VENTRORA</span>
            <span className="navbar__logo-sub">Eau de Parfum</span>
          </Link>

          {/* Right icons */}
          <div className="navbar__right">
            <Link to="/wishlist" className="navbar__icon" aria-label="Wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishItems.length ? 'var(--accent)' : 'none'} stroke={wishItems.length ? 'var(--accent)' : 'currentColor'} strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishItems.length > 0 && <span className="navbar__badge">{wishItems.length}</span>}
            </Link>
            <Link to="/account" className="navbar__icon" aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
            <button className="navbar__icon navbar__cart-btn" onClick={toggleCart} aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {count > 0 && <span className="navbar__badge navbar__badge--dark">{count}</span>}
            </button>
            <button className={`navbar__burger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <nav className="mobile-menu__nav">
          {[
            { label: 'Collections', path: '/collections' },
            { label: 'Our Story', path: '/about' },
            { label: 'Scent Finder', path: '/scent-finder' },
            { label: 'Wishlist', path: '/wishlist' },
            { label: 'Account', path: '/account' },
          ].map((l, i) => (
            <Link key={l.path} to={l.path} className="mobile-menu__link" style={{ animationDelay: `${i * 0.07}s` }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="mobile-menu__foot">Ventrora — Eau de Parfum</p>
      </div>
    </>
  )
}
