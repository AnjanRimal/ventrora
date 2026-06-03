import React from 'react'
import { Link } from 'react-router-dom'
import { founders } from '../data/products'
import './About.css'

const timeline = [
  { year: '2017', title: 'The First Store', desc: 'Dinesh and Manoj open their first Perfume Palace kiosk in a Virginia mall with a simple belief — everyone deserves world-class fragrance.' },
  { year: '2019', title: 'Rapid Expansion', desc: 'Perfume Palace grows to 10 locations across 5 states. The brand becomes known for its curated selection and expert staff.' },
  { year: '2021', title: 'Coast to Coast', desc: '20+ stores spanning the East and West Coast. Perfume Palace becomes one of the most recognized fragrance retail brands in American malls.' },
  { year: '2023', title: '30+ Locations', desc: 'Over 30 physical Perfume Palace stores across the United States. Each location hand-picked, each team personally trained.' },
  { year: '2026', title: 'Ventrora is Born', desc: 'After 7 years of curating the world\'s finest fragrances, Dinesh and Manoj launch Ventrora — their own luxury fragrance house. Seven signatures. One vision.' },
]

export default function About() {
  return (
    <div className="about">

      {/* HERO */}
      <section className="about__hero">
        <div className="about__hero-text">
          <span className="eyebrow">Our Story</span>
          <h1 className="section-title light">From One Store<br />to an <em>Empire</em></h1>
          <p>Two founders. One vision. 30+ stores across America.<br />Now launching their own luxury fragrance brand.</p>
        </div>
        <div className="about__hero-stats">
          <div className="about__hero-stat">
            <span>30+</span>
            <span>US Stores</span>
          </div>
          <div className="about__hero-stat-div" />
          <div className="about__hero-stat">
            <span>7+</span>
            <span>Years</span>
          </div>
          <div className="about__hero-stat-div" />
          <div className="about__hero-stat">
            <span>500+</span>
            <span>Fragrances Sold</span>
          </div>
          <div className="about__hero-stat-div" />
          <div className="about__hero-stat">
            <span>2026</span>
            <span>Ventrora Launch</span>
          </div>
        </div>
      </section>

      {/* FOUNDERS — Option D: photo + bio + quote */}
      <section className="about__founders">
        <div className="container">
          <div className="about__founders-header">
            <span className="eyebrow">The Founders</span>
            <h2 className="section-title">Two Founders. One <em>Vision</em>.</h2>
            <p>The minds behind Perfume Palace — and now Ventrora.</p>
          </div>

          <div className="about__founders-grid">
            {founders.map((f, i) => (
              <div key={f.id} className="founder-card">
                {/* Top: photo + bio */}
                <div className="founder-card__top">
                  <div className="founder-card__photo">
                    <img
                      src={f.image}
                      alt={f.name}
                      onError={e => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = `<div class="founder-card__initials">${f.name.split(' ').map(n => n[0]).join('')}</div>`
                      }}
                    />
                  </div>
                  <div className="founder-card__bio">
                    <div className="founder-card__header">
                      <h3 className="founder-card__name">{f.name}</h3>
                      <span className="founder-card__role">{f.role}</span>
                    </div>
                    <p className="founder-card__text">{f.bio}</p>
                  </div>
                </div>
                {/* Quote card */}
                <div className="founder-card__quote">
                  <span className="founder-card__quote-mark">"</span>
                  <p className="founder-card__quote-text">{f.quote}</p>
                  <span className="founder-card__quote-attr">— {f.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERFUME PALACE STORY */}
      <section className="about__palace">
        <div className="container">
          <div className="about__palace-inner">
            <div className="about__palace-text">
              <span className="eyebrow">Perfume Palace</span>
              <h2 className="section-title">Built Store<br />by <em>Store</em></h2>
              <p>What began as a single kiosk in a Virginia shopping mall grew into one of America's most recognizable fragrance retail brands. Perfume Palace now operates 30+ locations in major malls across the United States.</p>
              <p>Every store was built with the same philosophy — bring the finest fragrances from around the world to customers who deserve the best. No compromise on quality. No compromise on experience.</p>
              <p>Now, after 7 years of listening to hundreds of thousands of customers, Dinesh and Manoj are creating Ventrora — seven signature fragrances that represent everything they've learned.</p>
            </div>
            <div className="about__palace-visual">
              <div className="about__palace-badge">
                <span className="about__palace-num">30+</span>
                <span className="about__palace-label">Perfume Palace</span>
                <span className="about__palace-sub">Stores across the US</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="about__timeline">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="eyebrow">The Journey</span>
            <h2 className="section-title">From 2017 to <em>Ventrora</em></h2>
          </div>
          <div className="about__tl">
            {timeline.map((item, i) => (
              <div key={item.year} className={`about__tl-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="about__tl-content">
                  <span className="about__tl-year">{item.year}</span>
                  <h3 className="about__tl-title">{item.title}</h3>
                  <p className="about__tl-desc">{item.desc}</p>
                </div>
                <div className="about__tl-dot" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="about__philosophy">
        <div className="container">
          <div className="about__phil-grid">
            {[
              { icon: '◈', title: 'Quality First', desc: 'Every Ventrora fragrance is crafted using the finest raw ingredients — oud from Assam, roses from Grasse, vetiver from Haiti.' },
              { icon: '✦', title: 'Customer Obsessed', desc: '7 years of listening to our Perfume Palace customers taught us exactly what makes a fragrance truly great.' },
              { icon: '◇', title: 'Authenticity', desc: 'No shortcuts. No compromises. Every bottle of Ventrora represents our personal guarantee of quality.' },
            ].map(p => (
              <div key={p.title} className="about__phil-item">
                <span className="about__phil-icon">{p.icon}</span>
                <h3 className="about__phil-title">{p.title}</h3>
                <p className="about__phil-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about__cta">
        <div className="container">
          <div className="about__cta-inner">
            <span className="eyebrow">Experience Ventrora</span>
            <h2 className="section-title">Discover Our <em>Collection</em></h2>
            <p>Seven signature fragrances born from 7 years of passion, expertise and a relentless pursuit of perfection.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/collections" className="btn btn-dark">Shop the Collection</Link>
              <Link to="/scent-finder" className="btn btn-outline">Find My Scent</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
