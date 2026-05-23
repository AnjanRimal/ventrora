import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) { setSubscribed(true) }
  }

  return (
    <footer className="footer">
      {/* Newsletter Strip */}
      <div className="footer__newsletter">
        <div className="container">
          <div className="footer__newsletter-inner">
            <div className="footer__newsletter-text">
              <span className="footer__newsletter-label">Join the Maison</span>
              <h3>Be the first to discover new creations</h3>
            </div>
            {!subscribed ? (
              <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            ) : (
              <p className="footer__newsletter-success">
                ✦ Welcome to the Maison. We'll be in touch.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__brand">
              <div className="footer__logo">
                <span>VENTRORA</span>
                <span className="footer__logo-sub">PARIS</span>
              </div>
              <p className="footer__brand-desc">
                Maison de Parfum — Est. MMXXIV<br />
                Handcrafted in Grasse, France.<br />
                Rare ingredients. Timeless elegance.
              </p>
              <div className="footer__socials">
                <a href="#" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="#" aria-label="Pinterest">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.57 2.25-.87 3.5-.25 1.04.52 1.89 1.54 1.89 1.85 0 3.09-2.37 3.09-5.17 0-2.14-1.44-3.63-3.5-3.63-2.39 0-3.79 1.79-3.79 3.64 0 .72.28 1.49.62 1.91.07.08.08.15.06.23l-.23.93c-.04.15-.13.18-.3.11-1.12-.52-1.82-2.16-1.82-3.48 0-2.83 2.06-5.43 5.94-5.43 3.12 0 5.55 2.22 5.55 5.19 0 3.1-1.95 5.59-4.66 5.59-.91 0-1.77-.47-2.06-1.03l-.56 2.08c-.2.78-.75 1.75-1.12 2.34.84.26 1.73.4 2.65.4 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Collections */}
            <div className="footer__col">
              <h4>Collections</h4>
              <ul>
                <li><Link to="/collections">All Fragrances</Link></li>
                <li><Link to="/collections?filter=men">For Him</Link></li>
                <li><Link to="/collections?filter=women">For Her</Link></li>
                <li><Link to="/collections?filter=gift">Gifts</Link></li>
                <li><Link to="/collections/maison-duo">Maison Duo Set</Link></li>
              </ul>
            </div>

            {/* Maison */}
            <div className="footer__col">
              <h4>Maison</h4>
              <ul>
                <li><Link to="/story">Our Story</Link></li>
                <li><a href="#">Craftsmanship</a></li>
                <li><a href="#">Sustainability</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Stockists</a></li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer__col">
              <h4>Client Services</h4>
              <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Shipping & Returns</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Store Locator</a></li>
                <li><a href="#">Bespoke Orders</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer__bottom">
        <div className="container">
          <p>© 2026 Ventrora Paris. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
