import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import './Checkout.css'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1=shipping, 2=payment, 3=review
  const [placing, setPlacing] = useState(false)

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: user?.email || '',
    phone: '', address: '', city: '', state: '', zip: '', country: 'US'
  })

  const [payment, setPayment] = useState({
    cardName: '', cardNumber: '', expiry: '', cvv: ''
  })

  const handleShipping = (e) => setShipping(p => ({ ...p, [e.target.name]: e.target.value }))
  const handlePayment = (e) => setPayment(p => ({ ...p, [e.target.name]: e.target.value }))

  const formatCard = (val) => val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
  const formatExpiry = (val) => val.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5)

  const placeOrder = async () => {
    setPlacing(true)
    try {
      if (user) {
        await supabase.from('orders').insert({
          user_id: user.id,
          items: items,
          total: total + (total >= 250 ? 0 : 15),
          status: 'processing',
          shipping_address: shipping,
        })
      }
      clearCart()
      navigate('/order-success')
    } catch (err) {
      console.error(err)
      setPlacing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your bag is empty</h2>
        <Link to="/collections" className="btn btn--primary">Shop Now</Link>
      </div>
    )
  }

  const shipping_cost = total >= 250 ? 0 : 15
  const grand_total = total + shipping_cost

  return (
    <div className="checkout-page">
      <div className="checkout-page__header">
        <Link to="/" className="checkout-logo">
          <span>VENTRORA</span>
          <span className="checkout-logo__sub">PARIS</span>
        </Link>
      </div>

      <div className="checkout-inner container">
        {/* Left - Form */}
        <div className="checkout-form">
          {/* Steps */}
          <div className="checkout-steps">
            {['Shipping', 'Payment', 'Review'].map((s, i) => (
              <div key={s} className={`checkout-step ${step === i+1 ? 'checkout-step--active' : ''} ${step > i+1 ? 'checkout-step--done' : ''}`}>
                <span className="checkout-step__num">{step > i+1 ? '✓' : i+1}</span>
                <span>{s}</span>
              </div>
            ))}
          </div>

          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="checkout-section">
              <h2>Shipping Information</h2>
              <div className="checkout-grid-2">
                <div className="auth-field">
                  <label>First Name</label>
                  <input name="firstName" value={shipping.firstName} onChange={handleShipping} placeholder="Jean" required />
                </div>
                <div className="auth-field">
                  <label>Last Name</label>
                  <input name="lastName" value={shipping.lastName} onChange={handleShipping} placeholder="Dupont" required />
                </div>
              </div>
              <div className="auth-field">
                <label>Email Address</label>
                <input name="email" type="email" value={shipping.email} onChange={handleShipping} placeholder="your@email.com" required />
              </div>
              <div className="auth-field">
                <label>Phone</label>
                <input name="phone" value={shipping.phone} onChange={handleShipping} placeholder="+1 (555) 000-0000" />
              </div>
              <div className="auth-field">
                <label>Street Address</label>
                <input name="address" value={shipping.address} onChange={handleShipping} placeholder="123 Rue de la Paix" required />
              </div>
              <div className="checkout-grid-3">
                <div className="auth-field">
                  <label>City</label>
                  <input name="city" value={shipping.city} onChange={handleShipping} placeholder="Paris" required />
                </div>
                <div className="auth-field">
                  <label>State</label>
                  <input name="state" value={shipping.state} onChange={handleShipping} placeholder="NY" />
                </div>
                <div className="auth-field">
                  <label>ZIP Code</label>
                  <input name="zip" value={shipping.zip} onChange={handleShipping} placeholder="75001" required />
                </div>
              </div>
              <button className="btn btn--primary checkout-next"
                onClick={() => setStep(2)}
                disabled={!shipping.firstName || !shipping.email || !shipping.address || !shipping.city}
              >
                Continue to Payment →
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="checkout-section">
              <h2>Payment Details</h2>
              <div className="checkout-secure-badge">
                🔒 Your payment information is encrypted and secure
              </div>
              <div className="auth-field">
                <label>Name on Card</label>
                <input name="cardName" value={payment.cardName} onChange={handlePayment} placeholder="Jean Dupont" required />
              </div>
              <div className="auth-field">
                <label>Card Number</label>
                <input
                  name="cardNumber"
                  value={payment.cardNumber}
                  onChange={e => setPayment(p => ({ ...p, cardNumber: formatCard(e.target.value) }))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>
              <div className="checkout-grid-2">
                <div className="auth-field">
                  <label>Expiry Date</label>
                  <input
                    name="expiry"
                    value={payment.expiry}
                    onChange={e => setPayment(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div className="auth-field">
                  <label>CVV</label>
                  <input
                    name="cvv"
                    value={payment.cvv}
                    onChange={e => setPayment(p => ({ ...p, cvv: e.target.value.replace(/\D/g,'').slice(0,4) }))}
                    placeholder="•••"
                    maxLength={4}
                    required
                  />
                </div>
              </div>
              <div className="checkout-btn-row">
                <button className="btn btn--outline" onClick={() => setStep(1)}>← Back</button>
                <button className="btn btn--primary checkout-next"
                  onClick={() => setStep(3)}
                  disabled={!payment.cardName || payment.cardNumber.length < 19 || !payment.expiry || !payment.cvv}
                >
                  Review Order →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="checkout-section">
              <h2>Review Your Order</h2>
              <div className="checkout-review-block">
                <h3>Shipping To</h3>
                <p>{shipping.firstName} {shipping.lastName}</p>
                <p>{shipping.address}, {shipping.city} {shipping.state} {shipping.zip}</p>
                <p>{shipping.email}</p>
              </div>
              <div className="checkout-review-block">
                <h3>Payment</h3>
                <p>Card ending in {payment.cardNumber.slice(-4)}</p>
              </div>
              <div className="checkout-btn-row">
                <button className="btn btn--outline" onClick={() => setStep(2)}>← Back</button>
                <button className="btn btn--primary checkout-next" onClick={placeOrder} disabled={placing}>
                  {placing ? 'Placing Order...' : 'Place Order ✓'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right - Order Summary */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="checkout-summary__items">
            {items.map(item => (
              <div key={`${item.id}-${item.size}`} className="checkout-summary__item">
                <div className="checkout-summary__item-img">
                  <img src={item.image} alt={item.name} />
                  <span className="checkout-summary__qty">{item.qty}</span>
                </div>
                <div className="checkout-summary__item-info">
                  <p>{item.name}</p>
                  <span>{item.size}</span>
                </div>
                <span className="checkout-summary__item-price">${(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="checkout-summary__totals">
            <div className="checkout-summary__row">
              <span>Subtotal</span><span>${total.toLocaleString()}</span>
            </div>
            <div className="checkout-summary__row">
              <span>Shipping</span>
              <span>{shipping_cost === 0 ? 'Free' : `$${shipping_cost}`}</span>
            </div>
            <div className="checkout-summary__row checkout-summary__row--total">
              <span>Total</span><span>${grand_total.toLocaleString()}</span>
            </div>
          </div>
          {total < 250 && (
            <p className="checkout-summary__ship-note">
              Add ${(250 - total).toFixed(0)} more for complimentary shipping
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
