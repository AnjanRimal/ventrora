import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderSuccess() {
  return (
    <div style={{ minHeight: 'calc(100vh - var(--nav-height))', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
      <div style={{ maxWidth: '520px', textAlign: 'center' }}>
        <div style={{ width: '72px', height: '72px', background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: '28px', color: '#fff' }}>✓</div>
        <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: '12px' }}>Order Confirmed</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '40px', fontWeight: 400, color: 'var(--black)', marginBottom: '16px' }}>Thank <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>You</em></h1>
        <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--gray-dark)', marginBottom: '12px' }}>Your Ventrora order has been placed. You'll receive a confirmation email shortly with your tracking information.</p>
        <p style={{ fontSize: '13px', color: 'var(--gray-mid)', marginBottom: '40px' }}>Expected delivery: 3–5 business days</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/account" className="btn btn-outline">View My Orders</Link>
          <Link to="/collections" className="btn btn-dark">Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
