import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      navigate('/account')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-page__bg">
        <img src="/bottles/noir.jpg" alt="" />
        <div className="auth-page__overlay" />
      </div>
      <div className="auth-card">
        <Link to="/" className="auth-card__logo">
          <span>VENTRORA</span>
          <span className="auth-card__logo-sub">PARIS</span>
        </Link>
        <h1>Welcome Back</h1>
        <p className="auth-card__subtitle">Sign in to your Maison account</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn btn--primary auth-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-card__divider"><span>or</span></div>
        <p className="auth-card__switch">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
        <p className="auth-card__back">
          <Link to="/">← Back to Maison</Link>
        </p>
      </div>
    </div>
  )
}
