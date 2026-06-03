import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">

            {/* Col 1 — Brand */}
            <div className="footer__brand">
              <div className="footer__logo">
                <span className="footer__logo-v">V</span>
                <span className="footer__logo-name">VENTRORA</span>
                <span className="footer__logo-sub">EAU DE PARFUM</span>
              </div>
              <p className="footer__desc">
                Seven signature fragrances from the founders of Perfume Palace — 
                30+ US stores, 7 years of expertise, one luxury brand.
              </p>
              <div className="footer__socials">
                {[
                  { label: 'Instagram', icon: '◎' },
                  { label: 'TikTok', icon: '◈' },
                  { label: 'Facebook', icon: '◇' },
                ].map(s => (
                  <a key={s.label} href="#" className="footer__social" aria-label={s.label}>{s.icon}</a>
                ))}
              </div>
            </div>

            {/* Col 2 — Shop */}
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

            {/* Col 3 — About */}
            <div className="footer__col">
              <h4 className="footer__col-title">About</h4>
              <ul className="footer__links">
                {[
                  { label: 'Our Story', to: '/about' },
                  { label: 'The Founders', to: '/about' },
                  { label: 'Perfume Palace', to: '/about' },
                  { label: 'Scent Finder Quiz', to: '/scent-finder' },
                  { label: 'My Account', to: '/account' },
                  { label: 'Wishlist', to: '/wishlist' },
                ].map(l => (
                  <li key={l.label}><Link to={l.to} className="footer__link">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Newsletter */}
            <div className="footer__col footer__col--nl">
              <h4 className="footer__col-title">Stay in Touch</h4>
              <p className="footer__nl-desc">New launches, exclusive offers and fragrance guides.</p>
              <form className="footer__form" onSubmit={e => { e.preventDefault(); e.target.reset() }}>
                <input type="email" required placeholder="Your email" className="footer__input" />
                <button type="submit" className="footer__submit">→</button>
              </form>
              <div className="footer__contact">
                <p>📍 30+ Perfume Palace Stores Across the US</p>
                <p>✉ hello@ventrora.com</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p>© 2026 Ventrora. All rights reserved. A Perfume Palace brand.</p>
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
