import React, { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { products, filterProducts } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import './Collections.css'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'men', label: 'For Him' },
  { id: 'women', label: 'For Her' },
  { id: 'unisex', label: 'Unisex' },
  { id: 'oud', label: 'Oud' },
  { id: 'floral', label: 'Floral' },
  { id: 'woody', label: 'Woody' },
  { id: 'fresh', label: 'Fresh' },
]

export default function Collections() {
  const [params] = useSearchParams()
  const [active, setActive] = useState('all')
  const [sort, setSort] = useState('featured')
  const { addToCart } = useCart()
  const { toggle, isWished } = useWishlist()

  const filtered = useMemo(() => {
    let list = filterProducts(active)
    const q = params.get('q')
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q.toLowerCase()))
    if (sort === 'price-asc') list = [...list].sort((a, b) => Math.min(...Object.values(a.prices)) - Math.min(...Object.values(b.prices)))
    if (sort === 'price-desc') list = [...list].sort((a, b) => Math.min(...Object.values(b.prices)) - Math.min(...Object.values(a.prices)))
    return list
  }, [active, sort, params])

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <div className="collections">
      {/* Header */}
      <div className="collections__hero">
        <span className="eyebrow">Ventrora</span>
        <h1 className="section-title">The <em>Collection</em></h1>
        <p>Seven extraordinary Eau de Parfums. Each one a signature.</p>
      </div>

      {/* Controls */}
      <div className="collections__controls">
        <div className="collections__filters">
          {filters.map(f => (
            <button key={f.id} className={`coll-filter ${active === f.id ? 'active' : ''}`} onClick={() => setActive(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="collections__right">
          <span className="collections__count">{filtered.length} fragrances</span>
          <select className="collections__sort" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Masonry grid */}
      {filtered.length === 0 ? (
        <div className="collections__empty">
          <p>No fragrances found.</p>
          <button className="btn btn-outline" onClick={() => setActive('all')}>Clear Filters</button>
        </div>
      ) : (
        <div className="collections__grid">
          {/* Featured large */}
          {featured && (
            <div className="coll-featured">
              <Link to={`/product/${featured.id}`} className="coll-featured__img" style={{ background: featured.color }}>
                {featured.image && <img src={featured.image} alt={featured.name} onError={e => e.target.style.display = 'none'} />}
                <span className="coll-featured__v">V</span>
                {featured.badge && <span className="coll-badge">{featured.badge}</span>}
              </Link>
              <div className="coll-featured__info">
                <div>
                  <span className="coll-featured__name">{featured.name}</span>
                  <span className="coll-featured__sub">{featured.subtitle}</span>
                  <span className="coll-featured__price">From ${Math.min(...Object.values(featured.prices))}</span>
                </div>
                <div className="coll-featured__actions">
                  <button className="btn btn-dark" style={{ fontSize: '10px', padding: '11px 24px' }}
                    onClick={() => addToCart({ id: featured.id, name: featured.name, price: featured.prices[featured.sizes[0]], size: featured.sizes[0], color: featured.color, image: featured.image })}>
                    Add to Bag
                  </button>
                  <button className={`coll-wish ${isWished(featured.id) ? 'wished' : ''}`} onClick={() => toggle(featured)}>♡</button>
                </div>
              </div>
            </div>
          )}

          {/* Small grid */}
          <div className="coll-small-grid">
            {rest.map((p, i) => (
              <div key={p.id} className="coll-card" style={{ animationDelay: `${i * 0.06}s` }}>
                <Link to={`/product/${p.id}`} className="coll-card__img" style={{ background: p.color }}>
                  {p.image && <img src={p.image} alt={p.name} onError={e => e.target.style.display = 'none'} />}
                  <span className="coll-card__v">V</span>
                  {p.badge && <span className="coll-badge coll-badge--sm">{p.badge}</span>}
                  <div className="coll-card__overlay">
                    <button className="coll-card__quick" onClick={e => { e.preventDefault(); addToCart({ id: p.id, name: p.name, price: p.prices[p.sizes[0]], size: p.sizes[0], color: p.color, image: p.image }) }}>+ Add to Bag</button>
                  </div>
                </Link>
                <div className="coll-card__info">
                  <div>
                    <Link to={`/product/${p.id}`} className="coll-card__name">{p.shortName}</Link>
                    <span className="coll-card__price">From ${Math.min(...Object.values(p.prices))}</span>
                  </div>
                  <button className={`coll-wish coll-wish--sm ${isWished(p.id) ? 'wished' : ''}`} onClick={() => toggle(p)}>♡</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
