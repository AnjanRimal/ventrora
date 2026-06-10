import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()
  const handle = (e) => { e.preventDefault(); navigate('/account') }
  const up = (k, v) => setForm({ ...form, [k]: v })

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <Link to="/">
            <span className="auth-logo-v">V</span>
            <span className="auth-logo-name">VENTRORA</span>
            <span className="auth-logo-sub">EAU DE PARFUM</span>
          </Link>
        </div>
        <h1 className="auth-title">Join <em>Ventrora</em></h1>
        <p className="auth-sub">Create your account for exclusive access and early launches</p>
        <form onSubmit={handle}>
          <div className="form-field"><label className="form-label">Full Name</label><input type="text" required className="form-input" placeholder="Your name" value={form.name} onChange={e => up('name', e.target.value)} /></div>
          <div className="form-field"><label className="form-label">Email Address</label><input type="email" required className="form-input" placeholder="you@example.com" value={form.email} onChange={e => up('email', e.target.value)} /></div>
          <div className="form-field"><label className="form-label">Password</label><input type="password" required className="form-input" placeholder="Create a password" value={form.password} onChange={e => up('password', e.target.value)} /></div>
          <button type="submit" className="btn btn-dark auth-submit">Create Account</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
      <style>{`
        .auth-page{min-height:calc(100vh - var(--nav-height));background:var(--cream);display:flex;align-items:center;justify-content:center;padding:40px 20px}
        .auth-card{width:100%;max-width:420px;background:var(--white);border:1px solid var(--cream-mid);padding:48px 40px}
        .auth-logo{text-align:center;margin-bottom:32px}
        .auth-logo a{text-decoration:none;display:flex;flex-direction:column;align-items:center;gap:2px}
        .auth-logo-v{font-family:var(--font-serif);font-size:28px;color:var(--black)}
        .auth-logo-name{font-size:13px;letter-spacing:0.4em;font-weight:600;color:var(--black)}
        .auth-logo-sub{font-size:7px;letter-spacing:0.28em;color:var(--accent);text-transform:uppercase}
        .auth-title{font-family:var(--font-serif);font-size:28px;font-weight:400;color:var(--black);text-align:center;margin-bottom:6px}
        .auth-title em{font-style:italic;color:var(--accent)}
        .auth-sub{font-size:13px;color:var(--gray-dark);text-align:center;margin-bottom:28px}
        .auth-submit{width:100%;justify-content:center;padding:15px;margin-bottom:16px;margin-top:8px}
        .auth-switch{text-align:center;font-size:12px;color:var(--gray-mid)}
        .auth-switch a{color:var(--accent)}
      `}</style>
    </div>
  )
}
