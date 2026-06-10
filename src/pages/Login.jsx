import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const handle = (e) => { e.preventDefault(); navigate('/account') }

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
        <h1 className="auth-title">Welcome <em>Back</em></h1>
        <p className="auth-sub">Sign in to your Ventrora account</p>
        <form onSubmit={handle}>
          <div className="form-field">
            <label className="form-label">Email Address</label>
            <input type="email" required className="form-input" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-field">
            <label className="form-label">Password</label>
            <input type="password" required className="form-input" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          <div className="auth-forgot"><a href="#">Forgot password?</a></div>
          <button type="submit" className="btn btn-dark auth-submit">Sign In</button>
        </form>
        <p className="auth-switch">Don't have an account? <Link to="/signup">Create one</Link></p>
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
        .auth-forgot{text-align:right;margin-bottom:20px}
        .auth-forgot a{font-size:11px;color:var(--accent);text-decoration:underline}
        .auth-submit{width:100%;justify-content:center;padding:15px;margin-bottom:16px}
        .auth-switch{text-align:center;font-size:12px;color:var(--gray-mid);margin-top:4px}
        .auth-switch a{color:var(--accent)}
      `}</style>
    </div>
  )
}
