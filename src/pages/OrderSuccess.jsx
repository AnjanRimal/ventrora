import React from 'react'
import { Link } from 'react-router-dom'
import './OrderSuccess.css'

export default function OrderSuccess() {
  const orderNum = Math.random().toString(36).substr(2, 8).toUpperCase()

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✦</div>
        <span className="section-label">Order Confirmed</span>
        <h1>Thank You for Your Order</h1>
        <p className="success-card__msg">
          Your order <strong>#{orderNum}</strong> has been placed successfully.
          You will receive a confirmation email shortly.
        </p>
        <div className="success-card__details">
          <div className="success-detail">
            <span>Estimated Delivery</span>
            <strong>5–7 Business Days</strong>
          </div>
          <div className="success-detail">
            <span>Packaging</span>
            <strong>Signature Ventrora Box</strong>
          </div>
          <div className="success-detail">
            <span>Origin</span>
            <strong>Grasse, France</strong>
          </div>
        </div>
        <div className="success-card__actions">
          <Link to="/account" className="btn btn--primary">View My Orders</Link>
          <Link to="/collections" className="btn btn--outline">Continue Shopping</Link>
        </div>
        <p className="success-card__note">
          Questions? Contact our Maison team at <strong>maison@ventrora.paris</strong>
        </p>
      </div>
    </div>
  )
}
