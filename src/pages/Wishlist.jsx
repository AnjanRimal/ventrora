import React from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import './Wishlist.css'

export default function Wishlist() {
  const { items, toggle } = useWishlist()
  const { addToCart } = useCart()

  return (
    <div className="wishlist-page">
      <div className="wishlist-hero">
        <div className="container">
          <span className="section-label">My Wishlist</span>
          <h1 className="section-title">Saved <em>Fragrances</em></h1>
          <p>{items.length} {items.length === 1 ? 'fragrance' : 'fragrances'} saved</p>
        </div>
      </div>

      <div className="container">
        {items.length === 0 ? (
          <div className="wishlist-empty">
            <span>♡</span>
            <h2>Your wishlist is empty</h2>
            <p>Save your favourite fragrances to find them easily later.</p>
            <Link to="/collections" className="btn btn--primary">Explore Collection</Link>
          </div>
        ) : (
          <div className="wishlist-page-grid">
            {items.map(item => (
              <div key={item.id} className="wishlist-page-card">
                <Link to={`/collections/${item.id}`} className="wishlist-page-card__image">
                  <img src={item.image} alt={item.name} />
                  {item.badge && <span className="wishlist-page-card__badge">{item.badge}</span>}
                </Link>
                <div className="wishlist-page-card__body">
                  <span className="wishlist-page-card__gender">
                    {item.gender === 'men' ? 'For Him' : item.gender === 'women' ? 'For Her' : 'Gift'}
                  </span>
                  <h3>{item.name}</h3>
                  <p>{item.subtitle}</p>
                  <span className="wishlist-page-card__price">From ${item.price}</span>
                  <div className="wishlist-page-card__actions">
                    <button
                      className="btn btn--primary"
                      onClick={() => addToCart({ ...item, size: item.sizes[0] })}
                    >
                      Add to Bag
                    </button>
                    <button
                      className="wishlist-page-card__remove"
                      onClick={() => toggle(item)}
                      aria-label="Remove from wishlist"
                    >
                      ♡ Remove
                    </button>
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
