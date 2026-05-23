import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'
import { supabase } from '../lib/supabase'
import './Account.css'

const TABS = ['Overview', 'Orders', 'Wishlist', 'Settings']

export default function Account() {
  const { user, signOut } = useAuth()
  const { items: wishItems, toggle } = useWishlist()
  const navigate = useNavigate()
  const [tab, setTab] = useState('Overview')
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '')
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    fetchOrders()
  }, [user])

  const fetchOrders = async () => {
    if (!user) return
    setLoadingOrders(true)
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setOrders(data || [])
    setLoadingOrders(false)
  }

  const handleSaveProfile = async () => {
    await supabase.auth.updateUser({ data: { full_name: fullName } })
    setSaveMsg('Profile updated successfully!')
    setTimeout(() => setSaveMsg(''), 3000)
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  if (!user) return null

  return (
    <div className="account-page">
      {/* Hero */}
      <div className="account-hero">
        <div className="container">
          <span className="section-label">My Account</span>
          <h1 className="section-title">
            Welcome, <em>{user.user_metadata?.full_name?.split(' ')[0] || 'Valued Client'}</em>
          </h1>
          <p className="account-hero__email">{user.email}</p>
        </div>
      </div>

      <div className="container">
        <div className="account-layout">
          {/* Sidebar */}
          <aside className="account-sidebar">
            {TABS.map(t => (
              <button
                key={t}
                className={`account-nav-btn ${tab === t ? 'account-nav-btn--active' : ''}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
            <button className="account-nav-btn account-nav-btn--signout" onClick={handleSignOut}>
              Sign Out
            </button>
          </aside>

          {/* Content */}
          <div className="account-content">
            {/* OVERVIEW */}
            {tab === 'Overview' && (
              <div className="account-section">
                <h2>Account Overview</h2>
                <div className="account-stats">
                  <div className="account-stat">
                    <span className="account-stat__num">{orders.length}</span>
                    <span className="account-stat__label">Orders</span>
                  </div>
                  <div className="account-stat">
                    <span className="account-stat__num">{wishItems.length}</span>
                    <span className="account-stat__label">Wishlist</span>
                  </div>
                  <div className="account-stat">
                    <span className="account-stat__num">
                      {orders.reduce((s, o) => s + (o.total || 0), 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                    </span>
                    <span className="account-stat__label">Total Spent</span>
                  </div>
                </div>
                <div className="account-quick-links">
                  <button className="account-quick" onClick={() => setTab('Orders')}>
                    <span>📦</span> View Orders
                  </button>
                  <button className="account-quick" onClick={() => setTab('Wishlist')}>
                    <span>♡</span> View Wishlist
                  </button>
                  <Link to="/collections" className="account-quick">
                    <span>✦</span> Shop Collection
                  </Link>
                </div>
              </div>
            )}

            {/* ORDERS */}
            {tab === 'Orders' && (
              <div className="account-section">
                <h2>Order History</h2>
                {loadingOrders ? (
                  <p className="account-loading">Loading orders...</p>
                ) : orders.length === 0 ? (
                  <div className="account-empty">
                    <p>You haven't placed any orders yet.</p>
                    <Link to="/collections" className="btn btn--primary">Shop Now</Link>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map(order => (
                      <div key={order.id} className="order-card">
                        <div className="order-card__header">
                          <div>
                            <span className="order-card__id">Order #{order.id.slice(0,8).toUpperCase()}</span>
                            <span className="order-card__date">
                              {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                          </div>
                          <span className={`order-card__status order-card__status--${order.status}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="order-card__items">
                          {(order.items || []).map((item, i) => (
                            <span key={i} className="order-card__item">
                              {item.name} ({item.size}) × {item.qty}
                            </span>
                          ))}
                        </div>
                        <div className="order-card__total">
                          Total: <strong>${order.total?.toLocaleString()}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* WISHLIST */}
            {tab === 'Wishlist' && (
              <div className="account-section">
                <h2>My Wishlist</h2>
                {wishItems.length === 0 ? (
                  <div className="account-empty">
                    <p>Your wishlist is empty.</p>
                    <Link to="/collections" className="btn btn--primary">Explore Collection</Link>
                  </div>
                ) : (
                  <div className="wishlist-grid">
                    {wishItems.map(item => (
                      <div key={item.id} className="wishlist-card">
                        <Link to={`/collections/${item.id}`} className="wishlist-card__image">
                          <img src={item.image} alt={item.name} />
                        </Link>
                        <div className="wishlist-card__info">
                          <h4>{item.name}</h4>
                          <p>{item.subtitle}</p>
                          <span>${item.price}</span>
                        </div>
                        <div className="wishlist-card__actions">
                          <Link to={`/collections/${item.id}`} className="btn btn--primary wishlist-card__shop">View</Link>
                          <button className="wishlist-card__remove" onClick={() => toggle(item)}>Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS */}
            {tab === 'Settings' && (
              <div className="account-section">
                <h2>Profile Settings</h2>
                {saveMsg && <div className="account-save-msg">{saveMsg}</div>}
                <div className="settings-form">
                  <div className="auth-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="auth-field">
                    <label>Email Address</label>
                    <input type="email" value={user.email} disabled style={{ opacity: 0.6 }} />
                  </div>
                  <button className="btn btn--primary" onClick={handleSaveProfile}>
                    Save Changes
                  </button>
                </div>
                <div className="settings-danger">
                  <h3>Account Actions</h3>
                  <button className="btn btn--outline" onClick={handleSignOut}>Sign Out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
