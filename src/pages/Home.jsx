import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import './Home.css'

/* ---------- Marquee Strip ---------- */
const STRIP_ITEMS = [
  'Handcrafted in France',
  'Rare Ingredients',
  'Master Perfumers',
  'Timeless Elegance',
  'Sustainable Luxury',
  'Est. MMXXIV',
]

/* ---------- Intersection observer hook ---------- */
function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold: 0.15, ...options })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

/* ---------- Hero slides ---------- */
const heroSlides = [
  {
    id: 'noir',
    badge: 'New Arrival',
    title: 'Ventrora',
    italic: 'Noir',
    description: 'The iconic black faceted flacon, gilded in gold. Bold oud and dark amber entwined with smoky vetiver — power distilled into a bottle.',
    image: '/bottles/noir.jpg',
    accent: '#B8965A',
    cta: '/collections/noir',
    ctaLabel: 'Discover Noir',
  },
  {
    id: 'lumiere',
    badge: 'Luminous & Solar',
    title: 'Ventrora',
    italic: 'Lumière',
    description: 'An effervescent bouquet of lemon, ylang-ylang, and vanilla. A celebration of luminous femininity.',
    image: '/bottles/lumiere.jpg',
    accent: '#D4B07A',
    cta: '/collections/lumiere',
    ctaLabel: 'Discover Lumière',
  },
  {
    id: 'seraphine',
    badge: 'Best Seller',
    title: 'Ventrora',
    italic: 'Séraphine',
    description: 'An ethereal symphony of white florals and precious woods. The essence of feminine grace.',
    image: '/bottles/seraphine.jpg',
    accent: '#C8A882',
    cta: '/collections/seraphine',
    ctaLabel: 'Discover Séraphine',
  },
]

/* ---------- Product Card ---------- */
function ProductCard({ product, index }) {
  const [ref, inView] = useInView()
  return (
    <Link
      to={`/collections/${product.id}`}
      className={`product-card ${inView ? 'product-card--visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && (
          <span className="product-card__badge">{product.badge}</span>
        )}
        <div className="product-card__overlay">
          <span>View Fragrance →</span>
        </div>
      </div>
      <div className="product-card__info">
        <div className="product-card__meta">
          <span className="product-card__gender">
            {product.gender === 'men' ? 'For Him' : product.gender === 'women' ? 'For Her' : 'Gift'}
          </span>
          <span className="product-card__intensity">{product.intensity}</span>
        </div>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__subtitle">{product.subtitle}</p>
        <div className="product-card__footer">
          <span className="product-card__price">From ${product.price}</span>
          <span className="product-card__cta">Explore →</span>
        </div>
      </div>
    </Link>
  )
}

/* ---------- Home Page ---------- */
export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [filter, setFilter] = useState('all')
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [heritageRef, heritageVisible] = useInView()
  const [noteRef, noteVisible] = useInView()

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Auto-advance slides
  useEffect(() => {
    const iv = setInterval(() => setActiveSlide(s => (s + 1) % heroSlides.length), 6000)
    return () => clearInterval(iv)
  }, [])

  const slide = heroSlides[activeSlide]

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(p => p.gender === filter)

  return (
    <div className="home">
      {/* ===== HERO ===== */}
      <section className="hero">
        {heroSlides.map((s, i) => (
          <div
            key={s.id}
            className={`hero__slide ${i === activeSlide ? 'hero__slide--active' : ''}`}
          >
            <div className="hero__image-wrap">
              <img src={s.image} alt={s.title} />
              <div className="hero__image-tint" />
            </div>
          </div>
        ))}

        <div className={`hero__content ${heroLoaded ? 'hero__content--loaded' : ''}`}>
          <span className="hero__badge">{slide.badge}</span>
          <h1 className="hero__title">
            {slide.title}<br />
            <em>{slide.italic}</em>
          </h1>
          <p className="hero__desc">{slide.description}</p>
          <div className="hero__ctas">
            <Link to={slide.cta} className="btn btn--primary">{slide.ctaLabel}</Link>
            <Link to="/collections" className="btn btn--ghost">View All</Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="hero__indicators">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === activeSlide ? 'hero__dot--active' : ''}`}
              onClick={() => setActiveSlide(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Scroll cue */}
        <div className="hero__scroll">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[...STRIP_ITEMS, ...STRIP_ITEMS, ...STRIP_ITEMS].map((item, i) => (
            <span key={i} className="marquee-item">
              {item} <span className="marquee-dot">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== HERITAGE ===== */}
      <section className="heritage" ref={heritageRef}>
        <div className="container">
          <div className={`heritage__inner ${heritageVisible ? 'heritage__inner--visible' : ''}`}>
            <div className="heritage__text">
              <span className="section-label">L'Essence</span>
              <h2 className="section-title">A Heritage of<br /><em>Distinction</em></h2>
              <p>
                Every Ventrora fragrance is a testament to the art of perfumery — where rare ingredients
                from the world's most coveted terroirs are composed into olfactory masterpieces.
                Our master perfumers draw upon centuries of tradition, blending innovation
                with reverence for the craft.
              </p>
              <Link to="/story" className="btn btn--outline">Discover Our Heritage →</Link>
            </div>
            <div className="heritage__images">
              <div className="heritage__img heritage__img--main">
                <img src="/bottles/lumiere.jpg" alt="Ventrora Lumière" />
              </div>
              <div className="heritage__img heritage__img--small">
                <img src="/bottles/obsidian.jpg" alt="Ventrora Obsidian" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COLLECTION ===== */}
      <section className="collection">
        <div className="container">
          <div className="collection__header">
            <span className="section-label">La Collection</span>
            <h2 className="section-title">Signature <em>Fragrances</em></h2>
            <p>Five distinctive compositions, each telling its own story of elegance and allure.</p>
          </div>

          {/* Filter tabs */}
          <div className="collection__filters">
            {['all', 'men', 'women', 'gift'].map(f => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'filter-btn--active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All' : f === 'men' ? 'For Him' : f === 'women' ? 'For Her' : 'Gifts'}
              </button>
            ))}
          </div>

          <div className="collection__grid">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="collection__cta">
            <Link to="/collections" className="btn btn--primary">View Full Collection</Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURED ===== */}
      <section className="featured" ref={noteRef}>
        <div className="container">
          <div className={`featured__inner ${noteVisible ? 'featured__inner--visible' : ''}`}>
            <div className="featured__image">
              <img src="/bottles/seraphine.jpg" alt="Ventrora Séraphine" />
              <div className="featured__image-badge">New Arrival</div>
            </div>
            <div className="featured__text">
              <span className="section-label">Editor's Pick</span>
              <h2 className="section-title">Séraphine<br /><em>Parfum</em></h2>
              <p>
                Inspired by the golden hour glow over Parisian gardens, Séraphine is an ode to
                feminine grace. Notes of Bulgarian rose intertwine with creamy sandalwood,
                creating a trail that lingers in memory.
              </p>

              {/* Scent pyramid */}
              <div className="scent-pyramid">
                {[
                  { label: 'Top', notes: 'Bergamot, Pink Pepper' },
                  { label: 'Heart', notes: 'Bulgarian Rose, Jasmine' },
                  { label: 'Base', notes: 'Sandalwood, White Musk' },
                ].map(row => (
                  <div key={row.label} className="scent-row">
                    <span className="scent-row__label">{row.label}</span>
                    <span className="scent-row__notes">{row.notes}</span>
                  </div>
                ))}
              </div>

              <Link to="/collections/seraphine" className="btn btn--primary">Explore Séraphine</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PILLARS ===== */}
      <section className="pillars">
        <div className="container">
          <div className="pillars__grid">
            {[
              { icon: '✦', title: 'Master Perfumers', desc: 'Crafted by the finest noses trained in Grasse and Paris, with decades of olfactory mastery.' },
              { icon: '◈', title: 'Rare Ingredients', desc: 'Sourced from the world\'s most coveted terroirs — from Bulgarian rose valleys to Madagascan vanilla.' },
              { icon: '◇', title: 'Sustainable Luxury', desc: 'Committed to ethical sourcing, eco-conscious packaging, and zero-waste production processes.' },
              { icon: '⬡', title: 'Handcrafted in France', desc: 'Every bottle is individually filled, sealed, and inspected in our atelier in Grasse, France.' },
            ].map((pillar, i) => (
              <div key={i} className="pillar">
                <span className="pillar__icon">{pillar.icon}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
