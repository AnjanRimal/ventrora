import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProduct, products } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProduct(id)
  const { addToCart } = useCart()
  const { toggle, isWished } = useWishlist()
  const [size, setSize] = useState(null)
  const [tab, setTab] = useState('description')
  const [added, setAdded] = useState(false)

  if (!product) { navigate('/collections'); return null }

  const selectedSize = size || product.sizes[0]
  const price = product.prices[selectedSize]
  const related = products.filter(p => p.id !== id && (p.gender === product.gender || p.mood === product.mood)).slice(0, 3)

  const handleAdd = () => {
    addToCart({ id: product.id, name: product.name, price, size: selectedSize, color: product.color, image: product.image })
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="detail">
      {/* Breadcrumb */}
      <div className="detail__crumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/collections">Collections</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>
      </div>

      <div className="container">
        <div className="detail__main">
          {/* Image — Option B: with thumbnails */}
          <div className="detail__img-col">
            <div className="detail__img-wrap">
              <div className="detail__img" style={{ background: product.color }}>
                {product.image ? (
                  <img src={product.image} alt={product.name} onError={e => e.target.style.display = 'none'} />
                ) : null}
                <span className="detail__img-v">V</span>
                {product.badge && <span className="detail__badge">{product.badge}</span>}
              </div>
              {/* Thumbnail strip */}
              <div className="detail__thumbs">
                {related.slice(0, 3).map(p => (
                  <Link key={p.id} to={`/product/${p.id}`} className="detail__thumb" style={{ background: p.color }}>
                    {p.image && <img src={p.image} alt={p.name} onError={e => e.target.style.display = 'none'} />}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="detail__info">
            {/* Breadcrumb */}
            <div className="detail__wish-row">
              <span className="eyebrow" style={{ margin: 0 }}>{product.name.split(' ')[0]}</span>
              <button className={`detail__wish ${isWished(product.id) ? 'wished' : ''}`} onClick={() => toggle(product)}>
                {isWished(product.id) ? '♥' : '♡'} {isWished(product.id) ? 'Saved' : 'Save'}
              </button>
            </div>

            <h1 className="detail__name">{product.name}</h1>
            <p className="detail__sub">{product.subtitle}</p>
            <p className="detail__tagline">{product.tagline}</p>

            {/* Stars */}
            <div className="detail__stars">
              {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
              <span>{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Attributes grid */}
            <div className="detail__attrs">
              {[['Type', product.concentration], ['Longevity', product.longevity], ['Sillage', product.sillage]].map(([l, v]) => (
                <div key={l} className="detail__attr">
                  <span>{l}</span>
                  <strong>{v}</strong>
                </div>
              ))}
            </div>

            {/* Size selector */}
            <div className="detail__sizes">
              <p className="detail__size-label">Select Size</p>
              <div className="detail__size-opts">
                {product.sizes.map(s => (
                  <button key={s} className={`detail__size-btn ${selectedSize === s ? 'active' : ''}`} onClick={() => setSize(s)}>
                    {s}<span>${product.prices[s]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="detail__price-row">
              <span className="detail__price">${price}</span>
              <span className="detail__price-note">Free shipping on orders $150+</span>
            </div>

            {/* CTA */}
            <div className="detail__ctas">
              <button className={`btn btn-dark detail__add ${added ? 'added' : ''}`} onClick={handleAdd} style={{ flex: 1, justifyContent: 'center', padding: '16px' }}>
                {added ? '✓ Added to Bag' : 'Add to Bag'}
              </button>
              <button className={`detail__wish-btn ${isWished(product.id) ? 'wished' : ''}`} onClick={() => toggle(product)}>♡</button>
            </div>

            {/* Trust */}
            <div className="detail__trust">
              {['100% Authentic', 'Free Returns', 'Secure Payment', 'Gift Wrapping Available'].map(t => (
                <span key={t}>◆ {t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="detail__tabs">
          <div className="detail__tab-nav">
            {['description', 'notes', 'reviews'].map(t => (
              <button key={t} className={`detail__tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="detail__tab-content">
            {tab === 'description' && <p style={{ fontSize: '14px', lineHeight: '1.9', color: 'var(--gray-dark)', maxWidth: '700px' }}>{product.description}</p>}
            {tab === 'notes' && (
              <div className="detail__notes">
                {[['Top Notes', product.notes.top], ['Heart Notes', product.notes.heart], ['Base Notes', product.notes.base]].map(([tier, notes]) => (
                  <div key={tier} className="detail__note-row">
                    <span className="detail__note-tier">{tier}</span>
                    <div className="detail__note-tags">
                      {notes.map(n => <span key={n} className="detail__note-tag">{n}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === 'reviews' && (
              <div>
                <div className="detail__rating-big">
                  <span>★ {product.rating}</span>
                  <span>{product.reviews} verified reviews</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--gray-mid)', fontStyle: 'italic' }}>Reviews loading from verified purchasers...</p>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="detail__related">
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <span className="eyebrow">You May Also Like</span>
              <h2 className="section-title">Related <em>Fragrances</em></h2>
            </div>
            <div className="detail__related-grid">
              {related.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="detail__related-card">
                  <div className="detail__related-img" style={{ background: p.color }}>
                    {p.image && <img src={p.image} alt={p.name} onError={e => e.target.style.display = 'none'} />}
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'rgba(255,255,255,0.2)', position: 'relative', zIndex: 1 }}>V</span>
                  </div>
                  <div className="detail__related-info">
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'var(--black)', display: 'block' }}>{p.name}</span>
                    <span style={{ fontSize: '12px', color: 'var(--gray-mid)' }}>From ${Math.min(...Object.values(p.prices))}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
