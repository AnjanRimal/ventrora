import React from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import './Wishlist.css'

export default function Wishlist() {
  const { items, toggle } = useWishlist()
  const { addToCart } = useCart()

  return (
    <div className="wishlist">
      <div className="wishlist__hero">
        <span className="eyebrow">My Wishlist</span>
        <h1 className="section-title">Saved <em>Fragrances</em></h1>
        {items.length > 0 && <p>{items.length} {items.length === 1 ? 'fragrance' : 'fragrances'} saved</p>}
      </div>

      <div className="container">
        {items.length === 0 ? (
          <div className="wishlist__empty">
            <span className="wishlist__empty-icon">♡</span>
            <h2>Your wishlist is empty</h2>
            <p>Save your favorite fragrances to come back to them later.</p>
            <Link to="/collections" className="btn btn-dark">Explore Collection</Link>
          </div>
        ) : (
          <div className="wishlist__grid">
            {items.map(p => (
              <div key={p.id} className="wish-card">
                <Link to={`/product/${p.id}`} className="wish-card__img" style={{ background: p.color }}>
                  {p.image && <img src={p.image} alt={p.name} onError={e => e.target.style.display = 'none'} />}
                  <span className="wish-card__v">V</span>
                </Link>
                <div className="wish-card__info">
                  <div>
                    <Link to={`/product/${p.id}`} className="wish-card__name">{p.name}</Link>
                    <span className="wish-card__sub">{p.subtitle}</span>
                    <span className="wish-card__price">From ${Math.min(...Object.values(p.prices))}</span>
                  </div>
                  <div className="wish-card__actions">
                    <button
                      className="btn btn-dark"
                      style={{ fontSize: '10px', padding: '11px 0', flex: 1, justifyContent: 'center' }}
                      onClick={() => addToCart({ id: p.id, name: p.name, price: p.prices[p.sizes[0]], size: p.sizes[0], color: p.color, image: p.image })}
                    >
                      Add to Bag
                    </button>
                    <button className="wish-card__remove" onClick={() => toggle(p)} title="Remove">✕</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
