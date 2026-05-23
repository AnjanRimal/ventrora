import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './CartDrawer.css'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQty, total, count } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'cart-overlay--open' : ''}`} onClick={closeCart} />
      <div className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}>
        {/* Header */}
        <div className="cart-drawer__header">
          <div>
            <h2>Your Bag</h2>
            {count > 0 && <span className="cart-drawer__count">{count} {count === 1 ? 'item' : 'items'}</span>}
          </div>
          <button className="cart-drawer__close" onClick={closeCart} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="cart-drawer__items">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p>Your bag is empty</p>
              <Link to="/collections" onClick={closeCart} className="btn btn--primary">
                Explore Collection
              </Link>
            </div>
          ) : (
            items.map(item => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <div className="cart-item__image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item__info">
                  <div className="cart-item__top">
                    <div>
                      <h4>{item.name}</h4>
                      <span className="cart-item__size">{item.size}</span>
                    </div>
                    <button
                      className="cart-item__remove"
                      onClick={() => removeFromCart(item.id, item.size)}
                      aria-label="Remove"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                  <div className="cart-item__bottom">
                    <div className="cart-item__qty">
                      <button onClick={() => updateQty(item.id, item.size, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.size, item.qty + 1)}>+</button>
                    </div>
                    <span className="cart-item__price">${(item.price * item.qty).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__shipping">
              {total >= 250 ? (
                <span className="cart-drawer__free-ship">✓ Complimentary shipping included</span>
              ) : (
                <span>Add ${(250 - total).toFixed(0)} more for free shipping</span>
              )}
            </div>
            <div className="cart-drawer__total">
              <span>Subtotal</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <button className="btn btn--primary cart-drawer__checkout" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <Link to="/collections" className="cart-drawer__continue" onClick={closeCart}>
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
