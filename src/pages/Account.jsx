import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Account() {
  const [tab, setTab] = useState('overview')
  const tabs = [{ id: 'overview', label: 'Overview' }, { id: 'orders', label: 'Orders' }, { id: 'wishlist', label: 'Wishlist' }, { id: 'settings', label: 'Settings' }]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: '80px' }}>
      <div style={{ background: 'var(--black)', padding: '56px 48px 40px' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '10px' }}>My Account</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '40px', fontWeight: 400, color: '#fff' }}>Welcome <em style={{ fontStyle: 'italic', color: '#D4B896' }}>back</em></h1>
        </div>
      </div>
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--cream-mid)', marginBottom: '48px' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '18px 28px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, color: tab === t.id ? 'var(--accent)' : 'var(--gray-mid)', background: 'none', border: 'none', borderBottom: tab === t.id ? '2px solid var(--accent)' : '2px solid transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all 0.3s' }}>{t.label}</button>
          ))}
        </div>
        {tab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {[{ icon: '◈', label: 'Orders', val: '0 orders' }, { icon: '♡', label: 'Wishlist', val: '0 saved' }, { icon: '✦', label: 'Rewards', val: '0 points' }].map(s => (
              <div key={s.label} style={{ background: 'var(--white)', border: '1px solid var(--cream-mid)', padding: '32px', textAlign: 'center' }}>
                <span style={{ fontSize: '28px', color: 'var(--accent)', display: 'block', marginBottom: '12px' }}>{s.icon}</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--black)', display: 'block', marginBottom: '4px' }}>{s.val}</span>
                <span style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray-mid)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        )}
        {tab === 'orders' && (
          <div style={{ background: 'var(--white)', border: '1px solid var(--cream-mid)', padding: '72px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--gray-mid)', marginBottom: '20px' }}>No orders yet</p>
            <Link to="/collections" className="btn btn-dark" style={{ display: 'inline-flex' }}>Start Shopping</Link>
          </div>
        )}
        {tab === 'wishlist' && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Link to="/wishlist" className="btn btn-dark" style={{ display: 'inline-flex' }}>View My Wishlist</Link>
          </div>
        )}
        {tab === 'settings' && (
          <div style={{ background: 'var(--white)', border: '1px solid var(--cream-mid)', padding: '40px', maxWidth: '480px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', marginBottom: '28px', fontWeight: 400 }}>Account Settings</h2>
            <div className="form-field"><label className="form-label">Full Name</label><input className="form-input" defaultValue="Ventrora Customer" /></div>
            <div className="form-field"><label className="form-label">Email</label><input type="email" className="form-input" defaultValue="customer@example.com" /></div>
            <button className="btn btn-dark" style={{ marginTop: '8px' }}>Save Changes</button>
          </div>
        )}
      </div>
    </div>
  )
}
