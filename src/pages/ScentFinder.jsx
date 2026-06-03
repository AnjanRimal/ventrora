import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import './ScentFinder.css'

const questions = [
  {
    id: 1,
    question: 'What draws you most to a fragrance?',
    options: [
      { label: 'Dark & Mysterious', value: 'dark', icon: '◈' },
      { label: 'Fresh & Clean', value: 'fresh', icon: '◇' },
      { label: 'Warm & Sensual', value: 'warm', icon: '✦' },
      { label: 'Floral & Romantic', value: 'floral', icon: '✿' },
    ],
  },
  {
    id: 2,
    question: 'When do you typically wear fragrance?',
    options: [
      { label: 'Evening & Nights Out', value: 'evening', icon: '◐' },
      { label: 'Daily & Work', value: 'daily', icon: '◎' },
      { label: 'Special Occasions', value: 'special', icon: '◆' },
      { label: 'All Day Every Day', value: 'allday', icon: '○' },
    ],
  },
  {
    id: 3,
    question: 'How would others describe you?',
    options: [
      { label: 'Bold & Confident', value: 'bold', icon: '▲' },
      { label: 'Elegant & Refined', value: 'elegant', icon: '◇' },
      { label: 'Warm & Approachable', value: 'warm2', icon: '◉' },
      { label: 'Creative & Individual', value: 'creative', icon: '◈' },
    ],
  },
  {
    id: 4,
    question: 'What longevity matters most to you?',
    options: [
      { label: 'All day (12+ hours)', value: 'long', icon: '◈' },
      { label: 'Half day (6-8 hours)', value: 'medium', icon: '◇' },
      { label: 'Light & Subtle', value: 'light', icon: '○' },
      { label: 'Intense & Powerful', value: 'intense', icon: '◆' },
    ],
  },
  {
    id: 5,
    question: 'Pick a fragrance family you love most:',
    options: [
      { label: 'Oud & Oriental', value: 'oud', icon: '◈' },
      { label: 'Woody & Green', value: 'woody', icon: '◇' },
      { label: 'Floral & Fresh', value: 'floral2', icon: '✿' },
      { label: 'Warm & Spicy', value: 'spicy', icon: '✦' },
    ],
  },
]

function getRecommendations(answers) {
  const map = {
    dark: ['noir', 'midnight'],
    fresh: ['bleu', 'obsidian'],
    warm: ['lumiere', 'noir'],
    floral: ['seraphin', 'rose'],
    evening: ['noir', 'midnight', 'lumiere'],
    daily: ['bleu', 'obsidian'],
    special: ['noir', 'seraphin'],
    allday: ['bleu', 'lumiere'],
    bold: ['noir', 'midnight'],
    elegant: ['seraphin', 'lumiere'],
    warm2: ['lumiere', 'rose'],
    creative: ['obsidian', 'bleu'],
    long: ['noir', 'midnight'],
    medium: ['bleu', 'obsidian'],
    light: ['rose', 'seraphin'],
    intense: ['noir', 'lumiere'],
    oud: ['noir', 'lumiere'],
    woody: ['obsidian', 'midnight'],
    floral2: ['seraphin', 'rose'],
    spicy: ['lumiere', 'noir'],
  }
  const scores = {}
  answers.forEach(a => {
    const ids = map[a] || []
    ids.forEach(id => { scores[id] = (scores[id] || 0) + 1 })
  })
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => products.find(p => p.id === id))
    .filter(Boolean)
}

export default function ScentFinder() {
  const [step, setStep] = useState(0) // 0 = intro, 1-5 = questions, 6 = results
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)

  const current = questions[step - 1]
  const progress = step > 0 && step <= 5 ? (step / questions.length) * 100 : 0
  const recommendations = step === 6 ? getRecommendations(answers) : []

  const handleAnswer = (val) => {
    setSelected(val)
    setTimeout(() => {
      setAnswers(prev => [...prev, val])
      setSelected(null)
      setStep(prev => prev + 1)
    }, 350)
  }

  const restart = () => { setStep(0); setAnswers([]); setSelected(null) }

  if (step === 0) return (
    <div className="sf sf--intro">
      <div className="sf__intro-content">
        <span className="eyebrow">Personalized</span>
        <h1 className="section-title">Find Your <em>Perfect</em> Scent</h1>
        <p>Answer 5 quick questions and we'll match you with the Ventrora fragrance made for you.</p>
        <div className="sf__intro-info">
          <span>5 questions</span><span>◆</span>
          <span>60 seconds</span><span>◆</span>
          <span>Personalized result</span>
        </div>
        <button className="btn btn-dark" style={{ padding: '16px 48px', fontSize: '11px' }} onClick={() => setStep(1)}>
          Begin →
        </button>
      </div>
    </div>
  )

  if (step === 6) return (
    <div className="sf sf--results">
      <div className="sf__results-content">
        <span className="eyebrow">Your Match</span>
        <h2 className="section-title">Your <em>Recommendations</em></h2>
        <p>Based on your answers, these Ventrora fragrances are made for you.</p>
        <div className="sf__results-grid">
          {recommendations.map((p, i) => (
            <div key={p.id} className={`sf__result-card ${i === 0 ? 'featured' : ''}`}>
              {i === 0 && <span className="sf__result-badge">Best Match</span>}
              <div className="sf__result-img" style={{ background: p.color }}>
                {p.image && <img src={p.image} alt={p.name} onError={e => e.target.style.display = 'none'} />}
                <span className="sf__result-v">V</span>
              </div>
              <div className="sf__result-info">
                <h3 className="sf__result-name">{p.name}</h3>
                <p className="sf__result-tag">{p.tagline}</p>
                <span className="sf__result-price">From ${Math.min(...Object.values(p.prices))}</span>
              </div>
              <Link to={`/product/${p.id}`} className="btn btn-dark" style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '10px' }}>
                Shop Now
              </Link>
            </div>
          ))}
        </div>
        <div className="sf__results-actions">
          <button className="btn btn-outline" onClick={restart}>Retake Quiz</button>
          <Link to="/collections" className="btn btn-dark">See All Fragrances</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="sf sf--question">
      {/* Progress */}
      <div className="sf__progress">
        <div className="sf__progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="sf__step-info">
        <span>{step} of {questions.length}</span>
      </div>

      <div className="sf__question-content">
        <h2 className="sf__question">{current.question}</h2>
        <div className="sf__options">
          {current.options.map(opt => (
            <button
              key={opt.value}
              className={`sf__option ${selected === opt.value ? 'selected' : ''}`}
              onClick={() => handleAnswer(opt.value)}
            >
              <span className="sf__option-icon">{opt.icon}</span>
              <span className="sf__option-label">{opt.label}</span>
            </button>
          ))}
        </div>
        {/* Dots */}
        <div className="sf__dots">
          {questions.map((_, i) => (
            <span key={i} className={`sf__dot ${i < step ? 'done' : i === step - 1 ? 'active' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
