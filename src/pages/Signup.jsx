import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Signup() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    const { error } = await signUp(email, password, fullName)
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="auth-page">
        <div className="auth-page__bg">
          <img src="/bottles/lumiere.jpg" alt="" />
          <div className="auth-page__overlay" />
        </div>
        <div className="auth-card auth-card--success">
          <span className="auth-success-icon">✦</span>
          <h1>Welcome to the Maison</h1>
          <p>We've sent a confirmation email to <strong>{email}</strong>. Please verify your email to complete your registration.</p>
          <Link to="/login" className="btn btn--primary auth-btn">Sign In</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-page__bg">
        <img src="/bottles/lumiere.jpg" alt="" />
        <div className="auth-page__overlay" />
      </div>
      <div className="auth-card">
        <Link to="/" className="auth-card__logo">
          <span>VENTRORA</span>
          <span className="auth-card__logo-sub">PARIS</span>
        </Link>
        <h1>Join the Maison</h1>
        <p className="auth-card__subtitle">Create your exclusive account</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <div className="auth-field">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              required
            />
          </div>
          <button type="submit" className="btn btn--primary auth-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-card__divider"><span>or</span></div>
        <p className="auth-card__switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
        <p className="auth-card__back">
          <Link to="/">← Back to Maison</Link>
        </p>
      </div>
    </div>
  )
}
