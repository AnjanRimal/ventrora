import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import './Navbar.css'

const navLinks = [
  { label: 'Collections', path: '/collections' },
  { label: 'For Him', path: '/collections?filter=men' },
  { label: 'For Her', path: '/collections?filter=women' },
  { label: 'Gifts', path: '/collections?filter=gift' },
  { label: 'Our Story', path: '/story' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { count, toggleCart } = useCart()
  const { items: wishItems } = useWishlist()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setUserMenuOpen(false)
    document.body.style.overflow = ''
  }, [location])

  const toggleMenu = () => {
    setMenuOpen(v => {
      document.body.style.overflow = !v ? 'hidden' : ''
      return !v
    })
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <>
      <div className="announcement-bar">
        <p>Complimentary shipping on orders over $250 &nbsp;·&nbsp; New: Maison Duo Gift Set</p>
      </div>

      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <nav className="navbar__links navbar__links--left">
            {navLinks.slice(0, 2).map(link => (
              <Link key={link.path} to={link.path} className="navbar__link">{link.label}</Link>
            ))}
          </nav>

          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-main">VENTRORA</span>
            <span className="navbar__logo-sub">PARIS</span>
          </Link>

          <nav className="navbar__links navbar__links--right">
            {navLinks.slice(2).map(link => (
              <Link key={link.path} to={link.path} className="navbar__link">{link.label}</Link>
            ))}

            {/* Wishlist */}
            <Link to="/wishlist" className="navbar__icon" aria-label="Wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishItems.length ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishItems.length > 0 && <span className="navbar__badge">{wishItems.length}</span>}
            </Link>

            {/* User menu */}
            <div className="navbar__user-wrap">
              <button className="navbar__icon" onClick={() => setUserMenuOpen(v => !v)} aria-label="Account">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
              {userMenuOpen && (
                <div className="user-dropdown">
                  {user ? (
                    <>
                      <span className="user-dropdown__name">{user.user_metadata?.full_name || user.email}</span>
                      <Link to="/account">My Account</Link>
                      <Link to="/wishlist">Wishlist</Link>
                      <button onClick={handleSignOut}>Sign Out</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">Sign In</Link>
                      <Link to="/signup">Create Account</Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <button className="navbar__icon navbar__cart" onClick={toggleCart} aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {count > 0 && <span className="navbar__badge navbar__cart-badge">{count}</span>}
            </button>
          </nav>

          <button className="navbar__hamburger" onClick={toggleMenu} aria-label="Menu">
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <nav className="mobile-menu__nav">
          {navLinks.map((link, i) => (
            <Link key={link.path} to={link.path} className="mobile-menu__link" style={{ animationDelay: `${i * 0.07}s` }}>
              {link.label}
            </Link>
          ))}
          {user ? (
            <Link to="/account" className="mobile-menu__link" style={{ animationDelay: '0.35s' }}>My Account</Link>
          ) : (
            <Link to="/login" className="mobile-menu__link" style={{ animationDelay: '0.35s' }}>Sign In</Link>
          )}
        </nav>
        <div className="mobile-menu__footer">
          <p>Maison Ventrora — Est. MMXXIV</p>
        </div>
      </div>
    </>
  )
}
