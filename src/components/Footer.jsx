import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">

            {/* Brand + Socials */}
            <div className="footer__brand">
              <div className="footer__logo">
                <span className="footer__logo-v">V</span>
                <span className="footer__logo-name">VENTRORA</span>
              </div>
              <p className="footer__desc">Seven signature fragrances crafted for the extraordinary.</p>
              <div className="footer__socials">
                <a href="https://www.facebook.com/profile.php?id=61590619051747" target="_blank" rel="noreferrer" className="footer__social" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer__social" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="footer__social" aria-label="TikTok">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.79 1.52V6.78a4.85 4.85 0 0 1-1.02-.09z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Shop */}
            <div className="footer__col">
              <h4 className="footer__col-title">Shop</h4>
              <ul className="footer__links">
                {[
                  { label: 'All Fragrances', to: '/collections' },
                  { label: 'Ventrora Noir', to: '/product/noir' },
                  { label: 'Ventrora Midnight', to: '/product/midnight' },
                  { label: 'Ventrora Obsidian', to: '/product/obsidian' },
                  { label: 'Ventrora Lumière', to: '/product/lumiere' },
                  { label: 'Ventrora Séraphine', to: '/product/seraphin' },
                  { label: 'Ventrora Rose', to: '/product/rose' },
                ].map(l => (
                  <li key={l.label}><Link to={l.to} className="footer__link">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div className="footer__col">
              <h4 className="footer__col-title">About</h4>
              <ul className="footer__links">
                {[
                  { label: 'Our Story', to: '/about' },
                  { label: 'The Founders', to: '/about' },
                  { label: 'Contact Us', to: '/contact' },
                  { label: 'My Account', to: '/account' },
                  { label: 'Wishlist', to: '/wishlist' },
                ].map(l => (
                  <li key={l.label}><Link to={l.to} className="footer__link">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer__col footer__col--nl">
              <h4 className="footer__col-title">Stay in Touch</h4>
              <p className="footer__nl-desc">New launches, exclusive offers and fragrance guides.</p>
              <form className="footer__form" onSubmit={e => { e.preventDefault(); e.target.reset() }}>
                <input type="email" required placeholder="Your email" className="footer__input" />
                <button type="submit" className="footer__submit">→</button>
              </form>
              <div className="footer__contact">
                <p>✉ hello@ventrora.com</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p>© 2026 Ventrora. All rights reserved.</p>
            <div className="footer__bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Shipping Policy</a>
              <a href="#">Returns</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
