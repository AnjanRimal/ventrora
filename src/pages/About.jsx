import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './About.css'

const timeline = [
  { year: '2017', title: 'The First Store', desc: 'Dinesh and Manoj open their first fragrance retail location with a simple belief — everyone deserves world-class fragrance.' },
  { year: '2019', title: 'Rapid Expansion', desc: 'The brand grows across multiple states, becoming known for its curated selection and expert staff.' },
  { year: '2021', title: 'Coast to Coast', desc: 'Their stores become some of the most recognized fragrance retail destinations in American malls.' },
  { year: '2023', title: 'Nationwide', desc: 'Locations spanning the United States. Each hand-picked, each team personally trained.' },
  { year: '2026', title: 'Ventrora is Born', desc: 'After years of curating the world\'s finest fragrances, Dinesh and Manoj launch Ventrora — their own luxury fragrance house.' },
]

const faqs = [
  {
    category: 'Origin Story',
    items: [
      { q: 'What inspired you to start this fragrance brand?', a: 'After spending years in the fragrance retail industry and helping thousands of customers find scents they love, I realized there was an opportunity to create something of my own. I wanted to build a fragrance brand that combines luxury, quality, and accessibility while giving people a scent that truly reflects their identity.' },
      { q: 'When did your journey with perfumes begin?', a: 'My journey began many years ago when I entered the fragrance retail business. What started as a passion for fragrances gradually grew into operating multiple perfume stores across the United States and eventually inspired the creation of Ventrora.' },
      { q: 'Do you remember your first fragrance experience?', a: 'Yes. I remember being fascinated by how a fragrance could instantly create an emotion, a memory, or a feeling of confidence. It was amazing to see how one scent could leave a lasting impression on people.' },
      { q: 'Was there a specific moment that made you decide to enter the fragrance industry?', a: 'The turning point came when I realized fragrance is more than a product — it is a personal signature. Seeing customers become more confident and expressive through fragrance inspired me to dedicate my career to this industry.' },
      { q: 'What problem did you see in the market that you wanted to solve?', a: 'I noticed that many consumers had to choose between expensive luxury fragrances and lower-quality alternatives. I wanted to create a brand that delivers premium quality, exceptional performance, and elegant presentation without compromising value.' },
    ]
  },
  {
    category: 'Founder Background',
    items: [
      { q: 'What were you doing before starting this company?', a: 'Before creating Ventrora, I spent years building and operating fragrance retail businesses across the United States, gaining firsthand experience in customer preferences, product quality, and market trends.' },
      { q: 'How has your personal journey shaped the brand?', a: 'My journey taught me the value of hard work, resilience, and continuous improvement. Every challenge I faced as an entrepreneur helped shape the standards and vision behind Ventrora.' },
      { q: 'What does fragrance mean to you personally?', a: 'Fragrance is a form of self-expression. It tells a story without words and creates memories that last long after the moment has passed.' },
    ]
  },
  {
    category: 'Brand Philosophy',
    items: [
      { q: 'What does Ventrora stand for?', a: 'Ventrora stands for confidence, individuality, craftsmanship, and timeless elegance.' },
      { q: 'What emotions do you want customers to feel?', a: 'Confidence, sophistication, happiness, and a sense of personal identity.' },
      { q: 'How do you define luxury?', a: 'Luxury is not about price alone. Luxury is exceptional quality, attention to detail, memorable experiences, and products that make people feel special.' },
      { q: 'What values guide every decision in the company?', a: 'Quality, integrity, innovation, customer satisfaction, and long-term relationships.' },
    ]
  },
  {
    category: 'Product Vision',
    items: [
      { q: 'How do you select fragrances for the collection?', a: 'Every fragrance is carefully evaluated for quality, uniqueness, performance, and emotional impact before becoming part of our collection.' },
      { q: 'What qualities must a fragrance have before carrying the Ventrora name?', a: 'It must have excellent longevity, strong character, refined composition, and the ability to create a memorable experience.' },
      { q: 'What makes Ventrora different from mass-market perfumes?', a: 'We combine luxury-grade ingredients with deep industry knowledge. Every bottle reflects a personal commitment to quality — not a corporate formula.' },
    ]
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="faq-q">
        <span>{q}</span>
        <span className="faq-icon">{open ? '−' : '+'}</span>
      </div>
      {open && <p className="faq-a">{a}</p>}
    </div>
  )
}

export default function About() {
  return (
    <div className="about">

      {/* HERO */}
      <section className="about__hero">
        <div className="about__hero-text">
          <span className="eyebrow" style={{ color: '#C4A882' }}>Our Story</span>
          <h1 className="section-title light">From Retail<br />to Our Own <em>Creation</em></h1>
          <p>Two founders. Years of fragrance expertise.<br />Now launching their own luxury brand.</p>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="about__founders">
        <div className="container">
          <div className="about__founders-header">
            <span className="eyebrow">The Founders</span>
            <h2 className="section-title">The Minds Behind <em>Ventrora</em></h2>
          </div>

          {/* Photo — normal centered, not background */}
          <div className="about__founders-photo-wrap">
            <img
              src="/founders/founders.jpg"
              alt="Dinesh Bhandari and Manoj Adhikari — Co-Founders of Ventrora"
              className="about__founders-img"
              onError={e => { e.target.style.display = 'none' }}
            />
          </div>

          {/* Bios */}
          <div className="about__founders-bios">
            <div className="about__founder-bio">
              <h3 className="about__founder-name">Dinesh Bhandari</h3>
              <span className="about__founder-role">Co-Founder & CEO</span>
              <p className="about__founder-text">A visionary entrepreneur with over 7 years of expertise in luxury fragrance retail. Dinesh leads brand identity, creative direction and business strategy for Ventrora.</p>
              <blockquote className="about__founder-quote">"We spent years curating the world's finest fragrances for our customers. Ventrora is us finally creating one for ourselves."</blockquote>
            </div>
            <div className="about__founder-bio">
              <h3 className="about__founder-name">Manoj Adhikari</h3>
              <span className="about__founder-role">Co-Founder & COO</span>
              <p className="about__founder-text">The operational force who built one of the most recognized fragrance retail networks in the United States. Manoj brings deep expertise to every aspect of Ventrora — from product development to customer experience.</p>
              <blockquote className="about__founder-quote">"We know what customers want because we've listened to them for years. That knowledge is in every bottle of Ventrora."</blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="about__timeline">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="eyebrow">The Journey</span>
            <h2 className="section-title">Our Path <em>to Ventrora</em></h2>
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

      {/* FAQ */}
      <section className="about__faq">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="eyebrow">In Their Own Words</span>
            <h2 className="section-title">The Story <em>Behind the Brand</em></h2>
            <p style={{ fontSize: '14px', color: 'var(--gray-dark)', maxWidth: '480px', margin: '12px auto 0', lineHeight: '1.8' }}>
              Everything you wanted to know about Ventrora — straight from the founders.
            </p>
          </div>
          <div className="faq-sections">
            {faqs.map(section => (
              <div key={section.category} className="faq-section">
                <h3 className="faq-category">{section.category}</h3>
                <div className="faq-list">
                  {section.items.map((item, i) => (
                    <FAQItem key={i} q={item.q} a={item.a} />
                  ))}
                </div>
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
              { icon: '✦', title: 'Customer Obsessed', desc: 'Years of listening to our retail customers taught us exactly what makes a fragrance truly great.' },
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
            <p>Seven signature fragrances born from years of passion, expertise and a relentless pursuit of perfection.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/collections" className="btn btn-dark">Shop the Collection</Link>
              <Link to="/contact" className="btn btn-outline">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
