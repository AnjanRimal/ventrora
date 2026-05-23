import React, { useState, useEffect } from 'react'
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
  const [selectedSize, setSelectedSize] = useState(null)
  const [addedToCart, setAddedToCart] = useState(false)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    if (!product) navigate('/collections')
    else setSelectedSize(product.sizes[0])
  }, [product])

  if (!product) return null

  const related = products.filter(p => p.id !== id).slice(0, 3)
  const images = [product.image, product.imageAlt]

  const handleAdd = () => {
    if (!selectedSize) return
    addToCart({ id: product.id, name: product.name, subtitle: product.subtitle, image: product.image, price: product.price, size: selectedSize })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  return (
    <div className="product-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/collections">Collections</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="product-main">
        <div className="container">
          <div className="product-main__inner">
            {/* Images */}
            <div className="product-images">
              <div className="product-images__main">
                <img src={images[activeImg]} alt={product.name} />
              </div>
              <div className="product-images__thumbs">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`product-images__thumb ${i === activeImg ? 'product-images__thumb--active' : ''}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="product-details">
              {product.badge && (
                <span className="product-details__badge">{product.badge}</span>
              )}
              <span className="product-details__gender">
                {product.gender === 'men' ? 'For Him' : product.gender === 'women' ? 'For Her' : 'Gift Set'}
              </span>
              <h1 className="product-details__name">{product.name}</h1>
              <p className="product-details__subtitle">{product.subtitle}</p>

              {/* Rating */}
              <div className="product-details__rating">
                {'★★★★★'}
                <span>(124 reviews)</span>
              </div>

              <p className="product-details__desc">{product.description}</p>

              {/* Attributes */}
              <div className="product-attrs">
                <div className="product-attr">
                  <span className="product-attr__label">Longevity</span>
                  <span className="product-attr__val">{product.longevity}</span>
                </div>
                <div className="product-attr">
                  <span className="product-attr__label">Sillage</span>
                  <span className="product-attr__val">{product.sillage}</span>
                </div>
                <div className="product-attr">
                  <span className="product-attr__label">Concentration</span>
                  <span className="product-attr__val">{product.intensity}</span>
                </div>
              </div>

              {/* Scent Pyramid */}
              <div className="product-pyramid">
                <h3>Scent Profile</h3>
                {[
                  { tier: 'Top Notes', key: 'top' },
                  { tier: 'Heart Notes', key: 'heart' },
                  { tier: 'Base Notes', key: 'base' },
                ].map(({ tier, key }) => (
                  <div key={key} className="pyramid-tier">
                    <span className="pyramid-tier__label">{tier}</span>
                    <div className="pyramid-tier__notes">
                      {product.notes[key].map(note => (
                        <span key={note} className="pyramid-note">{note}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Size Selector */}
              <div className="product-sizes">
                <h3>Select Size</h3>
                <div className="product-sizes__options">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'size-btn--active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="product-purchase">
                <div className="product-price">
                  <span className="product-price__amount">${product.price}</span>
                  <span className="product-price__note">Free shipping over $250</span>
                </div>
                <div className="product-ctas">
                  <button
                    className={`btn btn--primary product-add ${addedToCart ? 'product-add--done' : ''}`}
                    onClick={handleAdd}
                  >
                    {addedToCart ? '✓ Added to Bag' : 'Add to Bag'}
                  </button>
                  <button className="btn btn--outline" onClick={() => toggle(product)}>
                    {isWished(product.id) ? '♥ Saved' : '♡ Wishlist'}
                  </button>
                </div>
              </div>

              {/* Trust badges */}
              <div className="product-trust">
                {[
                  { icon: '◈', label: 'Authentic & Certified' },
                  { icon: '✦', label: 'Handcrafted in France' },
                  { icon: '◇', label: 'Sustainable Packaging' },
                ].map(t => (
                  <div key={t.label} className="trust-item">
                    <span className="trust-item__icon">{t.icon}</span>
                    <span>{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Long Description */}
      <section className="product-story">
        <div className="container">
          <div className="product-story__inner">
            <span className="section-label">The Story</span>
            <h2 className="section-title">Behind <em>{product.name.split(' ')[1]}</em></h2>
            <p>{product.longDescription}</p>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="related">
        <div className="container">
          <div className="related__header">
            <span className="section-label">You May Also Like</span>
            <h2 className="section-title">Explore More <em>Fragrances</em></h2>
          </div>
          <div className="related__grid">
            {related.map(p => (
              <Link key={p.id} to={`/collections/${p.id}`} className="related-card">
                <div className="related-card__img">
                  <img src={p.image} alt={p.name} loading="lazy" />
                </div>
                <div className="related-card__info">
                  <h4>{p.name}</h4>
                  <p>{p.subtitle}</p>
                  <span>From ${p.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
