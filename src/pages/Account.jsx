import React, { useState, useEffect } from 'react'
import { getUserProfile, createProfile, updateProfile, getOrderHistory } from '../services/accountService.js'

export default function Account({ user }) {
  const [profile, setProfile] = useState(null)
  const [orders, setOrders] = useState([])
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (user) {
      loadProfile()
      loadOrders()
    }
  }, [user])

  async function loadProfile() {
    setLoading(true)
    const { data, error } = await getUserProfile(user.id)

    if (!data) {
      const { data: newProfile } = await createProfile(user.id, '', '', '')
      setProfile(newProfile)
    } else {
      setProfile(data)
      setName(data.name || '')
      setPhone(data.phone || '')
      setAddress(data.address || '')
    }
    setLoading(false)
  }

  async function loadOrders() {
    const { data, error } = await getOrderHistory(user.id)
    if (!error && data) setOrders(data)
  }

  async function handleSaveProfile() {
    setLoading(true)
    const { data, error } = await updateProfile(user.id, { name, phone, address })
    if (!error && data) {
      setProfile(data)
      setEditing(false)
    }
    setLoading(false)
  }

  if (!user) {
    return (
      <main className="page-wrap">
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: 24 }}>Account</h1>
          <div className="empty-box glass">
            <span className="icon">🔒</span>
            <p>Please login to view your account.</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="page-wrap">
      <div className="container">
        <span className="section-tag">Your Account</span>
        <h1 className="section-title" style={{ marginBottom: 24 }}>Profile</h1>

        <div className="account-card glass">
          <div className="account-avatar">👤</div>
          <p className="account-email">{user.email}</p>

          {editing ? (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" disabled={loading} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" disabled={loading} />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" disabled={loading} />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn-primary" onClick={handleSaveProfile} disabled={loading} style={{ flex: 1, justifyContent: 'center' }}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button className="btn-secondary" onClick={() => setEditing(false)} disabled={loading}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input value={profile?.name || 'Not set'} disabled />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input value={profile?.phone || 'Not set'} disabled />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input value={profile?.address || 'Not set'} disabled />
              </div>
              <button className="btn-primary login-button" onClick={() => setEditing(true)}>Edit Profile</button>
            </>
          )}
        </div>

        <div className="order-history glass">
          <h3>📦 Order History</h3>
          {orders.length === 0 ? (
            <p style={{ fontSize: 13, color: 'var(--muted)' }}>No orders yet.</p>
          ) : (
            orders.map(order => (
              <div className="order-item" key={order.id}>
                <div className="order-item-left">
                  <strong>Order #{order.id}</strong>
                  <span>{new Date(order.created_at).toLocaleDateString()} · {order.status}</span>
                </div>
                <span className="order-item-total">₹{Number(order.total).toLocaleString('en-IN')}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
