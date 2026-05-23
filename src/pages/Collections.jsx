import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import './Collections.css'

export default function Collections() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filterParam = searchParams.get('filter') || 'all'
  const [filter, setFilter] = useState(filterParam)
  const [sort, setSort] = useState('default')

  useEffect(() => {
    setFilter(searchParams.get('filter') || 'all')
  }, [searchParams])

  const handleFilter = (f) => {
    setFilter(f)
    if (f === 'all') setSearchParams({})
    else setSearchParams({ filter: f })
  }

  const filtered = products
    .filter(p => filter === 'all' || p.gender === filter)
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      return 0
    })

  const filterLabels = {
    all: 'All Fragrances',
    men: 'For Him',
    women: 'For Her',
    gift: 'Gifts',
  }

  return (
    <div className="collections-page">
      {/* Page Header */}
      <div className="collections-hero">
        <div className="collections-hero__bg">
          <img
            src="/bottles/seraphine.jpg"
            alt="Collections"
          />
          <div className="collections-hero__overlay" />
        </div>
        <div className="collections-hero__content">
          <span className="section-label">La Collection</span>
          <h1>Our <em>Fragrances</em></h1>
          <p>Discover the full Ventrora collection — each scent a world unto itself.</p>
        </div>
      </div>

      <div className="container">
        {/* Controls */}
        <div className="collections-controls">
          <div className="collections-filters">
            {Object.entries(filterLabels).map(([key, label]) => (
              <button
                key={key}
                className={`filter-btn ${filter === key ? 'filter-btn--active' : ''}`}
                onClick={() => handleFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="collections-sort">
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Count */}
        <p className="collections-count">
          Showing {filtered.length} {filtered.length === 1 ? 'fragrance' : 'fragrances'}
        </p>

        {/* Grid */}
        <div className="collections-grid">
          {filtered.map((product, i) => (
            <Link
              key={product.id}
              to={`/collections/${product.id}`}
              className="col-card"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="col-card__image">
                <img src={product.image} alt={product.name} loading="lazy" />
                {product.badge && <span className="col-card__badge">{product.badge}</span>}
                <div className="col-card__hover">
                  <div className="col-card__notes">
                    <span>Top: {product.notes.top[0]}</span>
                    <span>Heart: {product.notes.heart[0]}</span>
                    <span>Base: {product.notes.base[0]}</span>
                  </div>
                  <span className="col-card__cta">View Details →</span>
                </div>
              </div>
              <div className="col-card__body">
                <div className="col-card__top-row">
                  <span className="col-card__gender">
                    {product.gender === 'men' ? 'For Him' : product.gender === 'women' ? 'For Her' : 'Gift'}
                  </span>
                  <span className="col-card__intensity">{product.intensity}</span>
                </div>
                <h3>{product.name}</h3>
                <p className="col-card__tagline">{product.tagline}</p>
                <div className="col-card__bottom">
                  <span className="col-card__price">From ${product.price}</span>
                  <div className="col-card__sizes">
                    {product.sizes.map(s => (
                      <span key={s} className="col-card__size">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
