// LOGIN
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const handle = (e) => { e.preventDefault(); navigate('/account') }
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link to="/" style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', letterSpacing: '0.35em', color: 'var(--black)', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>VENTRORA</Link>
          <span style={{ fontSize: '7px', letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase' }}>EAU DE PARFUM</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 400, color: 'var(--black)', marginTop: '28px', marginBottom: '8px' }}>Welcome <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Back</em></h1>
          <p style={{ fontSize: '13px', color: 'var(--gray-dark)' }}>Sign in to your Ventrora account</p>
        </div>
        <form onSubmit={handle} style={{ background: 'var(--white)', padding: '36px', border: '1px solid var(--cream-mid)' }}>
          <div className="form-field"><label className="form-label">Email Address</label><input type="email" required className="form-input" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
          <div className="form-field"><label className="form-label">Password</label><input type="password" required className="form-input" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></div>
          <div style={{ textAlign: 'right', marginBottom: '20px' }}><a href="#" style={{ fontSize: '11px', color: 'var(--accent)', textDecoration: 'underline' }}>Forgot password?</a></div>
          <button type="submit" className="btn btn-dark" style={{ width: '100%', justifyContent: 'center', padding: '15px', marginBottom: '16px' }}>Sign In</button>
          <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--gray-mid)' }}>Don't have an account? <Link to="/signup" style={{ color: 'var(--accent)' }}>Create one</Link></p>
        </form>
      </div>
    </div>
  )
}

export function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()
  const handle = (e) => { e.preventDefault(); navigate('/account') }
  const up = (k, v) => setForm({ ...form, [k]: v })
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link to="/" style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', letterSpacing: '0.35em', color: 'var(--black)', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>VENTRORA</Link>
          <span style={{ fontSize: '7px', letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase' }}>EAU DE PARFUM</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 400, color: 'var(--black)', marginTop: '28px', marginBottom: '8px' }}>Join <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Ventrora</em></h1>
          <p style={{ fontSize: '13px', color: 'var(--gray-dark)' }}>Create your account for early access and exclusive offers</p>
        </div>
        <form onSubmit={handle} style={{ background: 'var(--white)', padding: '36px', border: '1px solid var(--cream-mid)' }}>
          <div className="form-field"><label className="form-label">Full Name</label><input type="text" required className="form-input" placeholder="Your name" value={form.name} onChange={e => up('name', e.target.value)} /></div>
          <div className="form-field"><label className="form-label">Email Address</label><input type="email" required className="form-input" placeholder="you@example.com" value={form.email} onChange={e => up('email', e.target.value)} /></div>
          <div className="form-field" style={{ marginBottom: '24px' }}><label className="form-label">Password</label><input type="password" required className="form-input" placeholder="Create a password" value={form.password} onChange={e => up('password', e.target.value)} /></div>
          <button type="submit" className="btn btn-dark" style={{ width: '100%', justifyContent: 'center', padding: '15px', marginBottom: '16px' }}>Create Account</button>
          <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--gray-mid)' }}>Already have an account? <Link to="/login" style={{ color: 'var(--accent)' }}>Sign in</Link></p>
        </form>
      </div>
    </div>
  )
}

export function Account() {
  const [tab, setTab] = useState('overview')
  const tabs = [{ id: 'overview', label: 'Overview' }, { id: 'orders', label: 'Orders' }, { id: 'wishlist', label: 'Wishlist' }, { id: 'settings', label: 'Settings' }]
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', padding: '0 0 80px' }}>
      <div style={{ background: 'var(--black)', padding: '48px 48px 36px' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '8px' }}>My Account</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 400, color: '#fff' }}>Welcome <em style={{ fontStyle: 'italic', color: '#D4B896' }}>back</em></h1>
        </div>
      </div>
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--cream-mid)', marginBottom: '48px' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '18px 28px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, color: tab === t.id ? 'var(--accent)' : 'var(--gray-mid)', background: 'none', border: 'none', borderBottom: tab === t.id ? '2px solid var(--accent)' : '2px solid transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all 0.3s' }}>{t.label}</button>
          ))}
        </div>
        {tab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            {[{ icon: '◈', label: 'Orders', val: '0 orders' }, { icon: '♡', label: 'Wishlist', val: '0 saved' }, { icon: '✦', label: 'Rewards', val: '0 points' }].map(s => (
              <div key={s.label} style={{ background: 'var(--white)', border: '1px solid var(--cream-mid)', padding: '28px', textAlign: 'center' }}>
                <span style={{ fontSize: '24px', color: 'var(--accent)', display: 'block', marginBottom: '10px' }}>{s.icon}</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--black)', display: 'block', marginBottom: '4px' }}>{s.val}</span>
                <span style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray-mid)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        )}
        {tab === 'orders' && (
          <div style={{ background: 'var(--white)', border: '1px solid var(--cream-mid)', padding: '60px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--gray-mid)' }}>No orders yet</p>
            <Link to="/collections" className="btn btn-dark" style={{ marginTop: '20px', display: 'inline-flex' }}>Start Shopping</Link>
          </div>
        )}
        {tab === 'wishlist' && (
          <Link to="/wishlist" className="btn btn-outline">View My Wishlist</Link>
        )}
        {tab === 'settings' && (
          <div style={{ background: 'var(--white)', border: '1px solid var(--cream-mid)', padding: '36px', maxWidth: '480px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', marginBottom: '24px' }}>Account Settings</h2>
            <div className="form-field"><label className="form-label">Full Name</label><input className="form-input" defaultValue="Ventrora Customer" /></div>
            <div className="form-field"><label className="form-label">Email</label><input type="email" className="form-input" defaultValue="customer@example.com" /></div>
            <button className="btn btn-dark" style={{ marginTop: '8px' }}>Save Changes</button>
          </div>
        )}
      </div>
    </div>
  )
}

function useState(initial) {
  return React.useState(initial)
}
