import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './CartDrawer.css'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQty, total, count } = useCart()
  const navigate = useNavigate()
  const shipping = total >= 150 ? 0 : 15

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={closeCart} />
      <div className={`cart ${isOpen ? 'cart--open' : ''}`}>

        {/* Dark header */}
        <div className="cart__head">
          <div>
            <h2 className="cart__title">Your Bag</h2>
            {count > 0 && <span className="cart__count">{count} {count === 1 ? 'item' : 'items'}</span>}
          </div>
          <button className="cart__close" onClick={closeCart}>✕</button>
        </div>

        {/* Items */}
        <div className="cart__items">
          {items.length === 0 ? (
            <div className="cart__empty">
              <div className="cart__empty-icon">◈</div>
              <p>Your bag is empty</p>
              <button className="btn btn-dark" style={{ fontSize: '10px', padding: '12px 28px' }} onClick={() => { closeCart(); navigate('/collections') }}>
                Discover Fragrances
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={`${item.id}-${item.size}`} className="cart__item">
                <div className="cart__item-img" style={{ background: item.color || '#1A1814' }}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} onError={e => { e.target.style.display = 'none' }} />
                  ) : (
                    <span className="cart__item-v">V</span>
                  )}
                </div>
                <div className="cart__item-info">
                  <div className="cart__item-top">
                    <div>
                      <p className="cart__item-name">{item.name}</p>
                      <span className="cart__item-size">{item.size} · EDP</span>
                    </div>
                    <button className="cart__item-remove" onClick={() => removeFromCart(item.id, item.size)}>✕</button>
                  </div>
                  <div className="cart__item-bot">
                    <div className="cart__qty">
                      <button className="cart__qty-btn" onClick={() => updateQty(item.id, item.size, item.qty - 1)}>−</button>
                      <span className="cart__qty-num">{item.qty}</span>
                      <button className="cart__qty-btn" onClick={() => updateQty(item.id, item.size, item.qty + 1)}>+</button>
                    </div>
                    <span className="cart__item-price">${(item.price * item.qty).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart__foot">
            <div className="cart__total">
              <span className="cart__total-label">Total</span>
              <span className="cart__total-amt">${(total + shipping).toLocaleString()}</span>
            </div>
            {shipping === 0 && <p className="cart__free-ship">✓ Free shipping included</p>}
            {shipping > 0 && <p className="cart__ship-msg">Add ${(150 - total).toFixed(0)} more for free shipping</p>}
            <button
              className="btn btn-accent"
              style={{ width: '100%', justifyContent: 'center', padding: '15px', marginBottom: '10px' }}
              onClick={() => { closeCart(); navigate('/checkout') }}
            >
              Checkout
            </button>
            <button className="cart__continue" onClick={closeCart}>Continue Shopping</button>
          </div>
        )}
      </div>
    </>
  )
}
