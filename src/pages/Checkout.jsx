import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Checkout.css'

const STEPS = ['Shipping', 'Payment', 'Review']

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [shipping, setShipping] = useState({ name: '', email: '', address: '', city: '', state: '', zip: '' })
  const [payment, setPayment] = useState({ name: '', number: '', expiry: '', cvv: '' })

  const shippingFee = total >= 150 ? 0 : 15
  const orderTotal = total + shippingFee

  const upS = (k, v) => setShipping(p => ({ ...p, [k]: v }))
  const upP = (k, v) => setPayment(p => ({ ...p, [k]: v }))

  const placeOrder = (e) => {
    e.preventDefault()
    clearCart()
    navigate('/order-success')
  }

  if (items.length === 0 && step < 2) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--gray-mid)' }}>Your bag is empty</p>
        <Link to="/collections" className="btn btn-dark">Shop Now</Link>
      </div>
    )
  }

  return (
    <div className="checkout">
      {/* Top bar */}
      <div className="checkout__top">
        <Link to="/" className="checkout__logo">
          <span>V</span>VENTRORA
        </Link>
        <div className="checkout__steps">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <span className={`checkout__step ${i === step ? 'active' : i < step ? 'done' : ''}`}>
                <span className="checkout__step-num">{i < step ? '✓' : i + 1}</span>
                {s}
              </span>
              {i < STEPS.length - 1 && <span className="checkout__step-line" />}
            </React.Fragment>
          ))}
        </div>
        <span className="checkout__secure">🔒 Secure Checkout</span>
      </div>

      <div className="checkout__body">
        {/* Form */}
        <div className="checkout__form">
          {step === 0 && (
            <form onSubmit={e => { e.preventDefault(); setStep(1) }}>
              <h2 className="checkout__section-title">Shipping Information</h2>
              <div className="checkout__grid-2">
                <div className="form-field"><label className="form-label">Full Name</label><input required className="form-input" placeholder="John Smith" value={shipping.name} onChange={e => upS('name', e.target.value)} /></div>
                <div className="form-field"><label className="form-label">Email</label><input required type="email" className="form-input" placeholder="you@example.com" value={shipping.email} onChange={e => upS('email', e.target.value)} /></div>
              </div>
              <div className="form-field"><label className="form-label">Address</label><input required className="form-input" placeholder="123 Main Street" value={shipping.address} onChange={e => upS('address', e.target.value)} /></div>
              <div className="checkout__grid-3">
                <div className="form-field"><label className="form-label">City</label><input required className="form-input" placeholder="New York" value={shipping.city} onChange={e => upS('city', e.target.value)} /></div>
                <div className="form-field"><label className="form-label">State</label><input required className="form-input" placeholder="NY" value={shipping.state} onChange={e => upS('state', e.target.value)} /></div>
                <div className="form-field"><label className="form-label">ZIP</label><input required className="form-input" placeholder="10001" value={shipping.zip} onChange={e => upS('zip', e.target.value)} /></div>
              </div>
              <div className="checkout__actions">
                <Link to="/collections" className="checkout__back">← Back to Shopping</Link>
                <button type="submit" className="btn btn-accent" style={{ padding: '15px 40px' }}>Continue to Payment →</button>
              </div>
            </form>
          )}

          {step === 1 && (
            <form onSubmit={e => { e.preventDefault(); setStep(2) }}>
              <h2 className="checkout__section-title">Payment Details</h2>
              <div className="form-field"><label className="form-label">Name on Card</label><input required className="form-input" placeholder="John Smith" value={payment.name} onChange={e => upP('name', e.target.value)} /></div>
              <div className="form-field"><label className="form-label">Card Number</label><input required className="form-input" placeholder="•••• •••• •••• ••••" value={payment.number} onChange={e => upP('number', e.target.value)} /></div>
              <div className="checkout__grid-2">
                <div className="form-field"><label className="form-label">Expiry Date</label><input required className="form-input" placeholder="MM/YY" value={payment.expiry} onChange={e => upP('expiry', e.target.value)} /></div>
                <div className="form-field"><label className="form-label">CVV</label><input required className="form-input" placeholder="•••" value={payment.cvv} onChange={e => upP('cvv', e.target.value)} /></div>
              </div>
              <div className="checkout__trust">
                {['Visa', 'Mastercard', 'Amex', 'Apple Pay'].map(c => <span key={c}>{c}</span>)}
              </div>
              <div className="checkout__actions">
                <button type="button" className="checkout__back" onClick={() => setStep(0)}>← Back</button>
                <button type="submit" className="btn btn-accent" style={{ padding: '15px 40px' }}>Review Order →</button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={placeOrder}>
              <h2 className="checkout__section-title">Review Your Order</h2>
              <div className="checkout__review-section">
                <h3>Shipping to</h3>
                <p>{shipping.name}<br />{shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}</p>
              </div>
              <div className="checkout__review-section">
                <h3>Payment</h3>
                <p>Card ending in {payment.number.slice(-4) || '••••'}</p>
              </div>
              <div className="checkout__actions">
                <button type="button" className="checkout__back" onClick={() => setStep(1)}>← Back</button>
                <button type="submit" className="btn btn-dark" style={{ padding: '15px 40px' }}>Place Order →</button>
              </div>
            </form>
          )}
        </div>

        {/* Order summary */}
        <div className="checkout__summary">
          <h3 className="checkout__summary-title">Order Summary</h3>
          <div className="checkout__summary-items">
            {items.map(i => (
              <div key={`${i.id}-${i.size}`} className="checkout__summary-item">
                <div className="checkout__summary-img" style={{ background: i.color || '#1A1814' }}>
                  {i.image && <img src={i.image} alt={i.name} onError={e => e.target.style.display = 'none'} />}
                </div>
                <div className="checkout__summary-info">
                  <span>{i.name}</span>
                  <span>{i.size} · ×{i.qty}</span>
                </div>
                <span className="checkout__summary-price">${(i.price * i.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="checkout__totals">
            <div className="checkout__total-row"><span>Subtotal</span><span>${total.toLocaleString()}</span></div>
            <div className="checkout__total-row"><span>Shipping</span><span>{shippingFee === 0 ? 'Free' : `$${shippingFee}`}</span></div>
            <div className="checkout__total-row checkout__total-row--grand"><span>Total</span><span>${orderTotal.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
