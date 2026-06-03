import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import './Home.css'

const marqueeItems = [
  'Ventrora Noir','Eau de Parfum','Ventrora Midnight','Handcrafted',
  'Ventrora Obsidian','Luxury Fragrance','Ventrora Lumière','Seven Signatures',
]

function useInView(t = 0.15) {
  const ref = useRef(null)
  const [v, sv] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { sv(true); o.disconnect() } }, { threshold: t })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  return [ref, v]
}

export default function Home() {
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [colRef, colVis] = useInView()
  const [pillRef, pillVis] = useInView()

  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])
  useEffect(() => {
    const iv = setInterval(() => setActive(v => (v + 1) % products.length), 3200)
    return () => clearInterval(iv)
  }, [])

  const activeProduct = products[active]

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero">

        {/* LEFT — text */}
        <div className={`hero__left ${loaded ? 'loaded' : ''}`}>
          <span className="eyebrow">New Collection — 2026</span>
          <h1 className="hero__title">
            The Art of<br />
            <em>Rare Fragrance</em>
          </h1>
          <p className="hero__sub">
            Seven extraordinary Eau de Parfums.<br />
            Crafted for those who know the difference.
          </p>
          <div className="hero__ctas">
            <Link to="/collections" className="btn btn-dark">Discover the Collection</Link>
            <Link to="/scent-finder" className="btn btn-outline">Find My Scent →</Link>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">7</span>
              <span className="hero__stat-label">Signatures</span>
            </div>
            <div className="hero__stat-div" />
            <div className="hero__stat">
              <span className="hero__stat-num">30+</span>
              <span className="hero__stat-label">US Stores</span>
            </div>
            <div className="hero__stat-div" />
            <div className="hero__stat">
              <span className="hero__stat-num">14hr</span>
              <span className="hero__stat-label">Longevity</span>
            </div>
          </div>
        </div>

        {/* RIGHT — bottle photo background + selector */}
        <div className="hero__right">
          {/* Full bottle photo as background */}
          <div className="hero__bg-bottle">
            {activeProduct.image && (
              <img
                key={activeProduct.id}
                src={activeProduct.image}
                alt={activeProduct.name}
                className="hero__bg-img"
                onError={e => e.target.style.display = 'none'}
              />
            )}
            {/* Dark overlay so bottle looks dramatic */}
            <div className="hero__bg-overlay" style={{ background: `linear-gradient(135deg, rgba(10,8,6,0.55) 0%, rgba(10,8,6,0.15) 100%)` }} />
            {/* Active bottle name */}
            <div className="hero__active-label">
              <span className="hero__active-name">{activeProduct.name}</span>
              <span className="hero__active-type">{activeProduct.subtitle}</span>
              <span className="hero__active-price">From ${Math.min(...Object.values(activeProduct.prices))}</span>
            </div>
          </div>

          {/* Bottom — selector strip */}
          <div className="hero__selector">
            <div className="hero__bottles">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  className={`hero__bottle-btn ${i === active ? 'active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  <div className="hero__bottle-swatch" style={{ background: p.color }} />
                  <span className="hero__bottle-label">{p.shortName}</span>
                </button>
              ))}
            </div>
            <div className="hero__dots">
              {products.map((_, i) => (
                <button key={i} className={`hero__dot ${i === active ? 'active' : ''}`} onClick={() => setActive(i)} />
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee__item">{item}<span className="marquee__sep">◆</span></span>
          ))}
        </div>
      </div>

      {/* ── COLLECTION ── */}
      <section className="hc" ref={colRef}>
        <div className="container">
          <div className="hc__header">
            <span className="eyebrow">The Collection</span>
            <h2 className="section-title">Seven <em>Signatures</em></h2>
            <p>From the darkest oud to the lightest rose — each fragrance tells its own story.</p>
          </div>
          <div className={`hc__grid ${colVis ? 'visible' : ''}`}>
            <Link to={`/product/${products[0].id}`} className="hc__featured">
              <div className="hc__featured-img" style={{ background: products[0].color }}>
                {products[0].image && <img src={products[0].image} alt={products[0].name} onError={e => e.target.style.display = 'none'} />}
                <span className="hc__v">V</span>
                {products[0].badge && <span className="hc__badge">{products[0].badge}</span>}
              </div>
              <div className="hc__featured-info">
                <span className="hc__featured-name">{products[0].name}</span>
                <span className="hc__featured-price">From ${Math.min(...Object.values(products[0].prices))}</span>
              </div>
            </Link>
            <div className="hc__small-grid">
              {products.slice(1).map((p, i) => (
                <Link key={p.id} to={`/product/${p.id}`} className="hc__card" style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="hc__card-img" style={{ background: p.color }}>
                    {p.image && <img src={p.image} alt={p.name} onError={e => e.target.style.display = 'none'} />}
                    <span className="hc__card-v">V</span>
                  </div>
                  <div className="hc__card-info">
                    <span className="hc__card-name">{p.shortName}</span>
                    <span className="hc__card-price">From ${Math.min(...Object.values(p.prices))}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/collections" className="btn btn-outline">View All Fragrances</Link>
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section className="home-story">
        <div className="container">
          <div className="home-story__inner">
            <div className="home-story__text">
              <span className="eyebrow">Our Story</span>
              <h2 className="section-title">From 30 Stores<br />to Our Own <em>Creation</em></h2>
              <p className="home-story__desc">Founded by Dinesh Bhandari and Manoj Adhikari — the team behind Perfume Palace, America's most loved mall fragrance brand with 30+ US locations — Ventrora represents the next chapter.</p>
              <p className="home-story__desc">After 7 years of curating the world's finest fragrances for their customers, they created their own.</p>
              <div className="home-story__stats">
                <div className="home-story__stat"><span>30+</span><span>US Stores</span></div>
                <div className="home-story__stat"><span>7+</span><span>Years</span></div>
                <div className="home-story__stat"><span>2026</span><span>Ventrora</span></div>
              </div>
              <Link to="/about" className="btn btn-dark">Meet the Founders</Link>
            </div>
            <div className="home-story__visual">
              <div className="home-story__bottle" style={{ background: products[0].color }}>
                {products[0].image && <img src={products[0].image} alt="" onError={e => e.target.style.display = 'none'} />}
                <span className="home-story__v">V</span>
              </div>
              {[['Top', 'Bergamot, Black Pepper'], ['Heart', 'Oud, Rose'], ['Base', 'Amber, Musk']].map(([tier, val], i) => (
                <div key={tier} className={`home-story__note note-${i}`}>
                  <span className="home-story__note-tier">{tier}</span>
                  <span className="home-story__note-val">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="home-pillars" ref={pillRef}>
        <div className={`home-pillars__grid ${pillVis ? 'visible' : ''}`}>
          {[
            { icon: '◈', title: 'Handcrafted', desc: 'Every bottle crafted with obsessive attention to detail using the finest raw ingredients worldwide.' },
            { icon: '✦', title: 'Long Lasting', desc: 'Our EDP concentration ensures your fragrance lasts 10–14 hours on skin with exceptional sillage.' },
            { icon: '◇', title: 'Free Shipping', desc: 'Complimentary shipping on all orders over $150 anywhere in the United States.' },
            { icon: '⬡', title: '30+ Stores', desc: 'Visit any of our 30+ Perfume Palace locations to experience Ventrora in person.' },
          ].map((p, i) => (
            <div key={p.title} className="home-pillar" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="home-pillar__icon">{p.icon}</span>
              <h3 className="home-pillar__title">{p.title}</h3>
              <p className="home-pillar__desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SCENT FINDER CTA ── */}
      <section className="home-finder">
        <div className="container">
          <div className="home-finder__inner">
            <div>
              <span className="eyebrow">Personalized</span>
              <h2 className="section-title">Not Sure Where<br /><em>to Start?</em></h2>
              <p style={{ fontSize: '14px', color: 'var(--gray-dark)', lineHeight: '1.8', maxWidth: '400px', marginBottom: '28px' }}>
                Take our 60-second scent quiz and we'll recommend the perfect Ventrora fragrance for you.
              </p>
              <Link to="/scent-finder" className="btn btn-dark">Take the Quiz →</Link>
            </div>
            <div className="home-finder__bottles">
              {products.slice(0, 3).map((p, i) => (
                <div key={p.id} className="home-finder__bottle" style={{ animationDelay: `${i * 0.2}s` }}>
                  {p.image && <img src={p.image} alt={p.name} onError={e => e.target.style.display = 'none'} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="home-nl">
        <div className="container">
          <div className="home-nl__inner">
            <div>
              <span className="eyebrow">Join Ventrora</span>
              <h2 className="home-nl__title">Exclusive Access & <em>Early Launches</em></h2>
              <p style={{ fontSize: '13px', color: 'var(--gray-dark)' }}>New fragrances, limited editions and guides straight to your inbox.</p>
            </div>
            <form className="home-nl__form" onSubmit={e => { e.preventDefault(); e.target.reset(); alert('Welcome to Ventrora.') }}>
              <input type="email" placeholder="Your email address" required className="form-input" style={{ flex: 1, borderRight: 'none' }} />
              <button type="submit" className="btn btn-dark">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

    </div>
  )
}
