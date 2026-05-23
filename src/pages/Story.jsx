import React from 'react'
import { Link } from 'react-router-dom'
import './Story.css'

const timeline = [
  { year: '2020', title: 'The Vision', desc: 'Founded in a Parisian apartment by two master perfumers who believed luxury should be both rare and responsible.' },
  { year: '2021', title: 'First Atelier', desc: 'Our first atelier opens in Grasse — the perfume capital of the world — giving us direct access to the finest flowers and ingredients.' },
  { year: '2022', title: 'Noir & Lumière', desc: 'Our founding duo launches to critical acclaim. Vogue calls Lumière "the fragrance of a decade." Noir sells out within two weeks.' },
  { year: '2024', title: 'Maison Established', desc: 'Ventrora is formally established as a Maison de Parfum, introducing Obsidian, Séraphine, and the Maison Duo Gift Set.' },
]

export default function Story() {
  return (
    <div className="story-page">
      {/* Hero */}
      <section className="story-hero">
        <div className="story-hero__bg">
          <img
            src="/bottles/obsidian.jpg"
            alt="Ventrora Atelier"
          />
          <div className="story-hero__overlay" />
        </div>
        <div className="story-hero__content">
          <span className="section-label">Notre Histoire</span>
          <h1>The Art of <em>Perfumery</em></h1>
          <p>A story of obsession, craft, and the pursuit of olfactory perfection.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="story-mission">
        <div className="container">
          <div className="story-mission__inner">
            <div className="story-mission__text">
              <span className="section-label">Our Philosophy</span>
              <h2 className="section-title">Crafted for<br /><em>Connoisseurs</em></h2>
              <p>
                At Ventrora, we believe a fragrance is not merely a scent — it is a narrative,
                a memory, a silent statement of who you are. Our master perfumers spend years
                developing each composition, sourcing only the rarest ingredients, rejecting
                shortcuts in favour of authenticity.
              </p>
              <p>
                We are a house built on restraint. We launch one collection per year.
                We source ethically and bottle by hand. We do not compromise.
              </p>
              <Link to="/collections" className="btn btn--primary">Explore the Collection</Link>
            </div>
            <div className="story-mission__image">
              <img
                src="/bottles/lumiere.jpg"
                alt="Ventrora craftsmanship"
              />
              <div className="story-mission__image-caption">
                <span>Our Grasse Atelier</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="story-stats">
        <div className="container">
          <div className="story-stats__grid">
            {[
              { number: '14', label: 'Rare Ingredients per Fragrance' },
              { number: '3+', label: 'Years Per Composition' },
              { number: '100%', label: 'Handcrafted in France' },
              { number: '∞', label: 'Commitment to Quality' },
            ].map(stat => (
              <div key={stat.label} className="stat">
                <span className="stat__number">{stat.number}</span>
                <span className="stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="story-timeline">
        <div className="container">
          <div className="story-timeline__header">
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">A Brief <em>History</em></h2>
          </div>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div key={item.year} className={`timeline-item ${i % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}>
                <div className="timeline-item__content">
                  <span className="timeline-item__year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="timeline-item__dot" />
              </div>
            ))}
            <div className="timeline__line" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="story-values">
        <div className="container">
          <div className="story-values__header">
            <span className="section-label">What We Stand For</span>
            <h2 className="section-title">Our <em>Values</em></h2>
          </div>
          <div className="story-values__grid">
            {[
              {
                title: 'Authenticity',
                desc: 'Every ingredient is traced to its source. Every claim is verifiable. We are transparent about what goes into our fragrances and why.',
              },
              {
                title: 'Sustainability',
                desc: 'We work directly with farmers who use regenerative practices. Our bottles are refillable. Our boxes are made from recycled materials.',
              },
              {
                title: 'Excellence',
                desc: 'We launch rarely because we only release what is truly exceptional. If it does not move us, it does not leave the atelier.',
              },
            ].map(val => (
              <div key={val.title} className="value-card">
                <div className="value-card__line" />
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="story-cta">
        <div className="story-cta__bg">
          <img
            src="/bottles/noir.jpg"
            alt="Ventrora"
          />
          <div className="story-cta__overlay" />
        </div>
        <div className="story-cta__content">
          <span className="section-label">Experience Ventrora</span>
          <h2>Find Your <em>Signature Scent</em></h2>
          <p>Every fragrance tells a story. Discover yours.</p>
          <Link to="/collections" className="btn btn--ghost">Explore the Collection</Link>
        </div>
      </section>
    </div>
  )
}
