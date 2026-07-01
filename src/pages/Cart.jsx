import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCartItems, updateCartQty, removeFromCart, clearCart } from '../services/cartService.js'
import { createOrder } from '../services/accountService.js'

export default function Cart({ user, onCartChange }) {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) fetchCart()
  }, [user])

  async function fetchCart() {
    setLoading(true)
    const { data, error } = await getCartItems(user.id)
    if (!error && data) setCartItems(data)
    setLoading(false)
  }

  async function handleUpdateQty(cartId, newQty) {
    if (newQty < 1) {
      await handleRemove(cartId)
      return
    }
    const { data, error } = await updateCartQty(cartId, newQty)
    if (!error && data) {
      setCartItems(cartItems.map(item => item.id === cartId ? { ...item, qty: newQty } : item))
      onCartChange()
    }
  }

  async function handleRemove(cartId) {
    await removeFromCart(cartId)
    setCartItems(cartItems.filter(item => item.id !== cartId))
    onCartChange()
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  async function handleCheckout() {
    if (cartItems.length === 0) return
    await createOrder(user.id, cartItems, subtotal)
    await clearCart(user.id)
    setCartItems([])
    onCartChange()
    alert('Order placed successfully!')
  }

  if (!user) {
    return (
      <main className="page-wrap">
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: 28 }}>Your Cart</h1>
          <div className="empty-box glass">
            <span className="icon">🔒</span>
            <p>Please login to view your cart.</p>
            <Link to="/login"><button className="btn-primary">Login</button></Link>
          </div>
        </div>
      </main>
    )
  }

  if (!loading && cartItems.length === 0) {
    return (
      <main className="page-wrap">
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: 28 }}>Your Cart</h1>
          <div className="empty-box glass">
            <span className="icon">🛒</span>
            <p>Your cart is empty.</p>
            <Link to="/shop"><button className="btn-primary">Start Shopping</button></Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="page-wrap">
      <div className="container">
        <h1 className="section-title" style={{ marginBottom: 28 }}>Your Cart</h1>
        <div className="cart-layout">
          <div className="cart-list">
            {cartItems.map(item => (
              <div className="cart-item glass" key={item.id}>
                <div className="cart-item-img">{item.icon || '📦'}</div>
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.product_name}</p>
                  <p className="cart-item-price">₹{Number(item.price).toLocaleString('en-IN')} each</p>
                </div>
                <div className="qty-control">
                  <button onClick={() => handleUpdateQty(item.id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => handleUpdateQty(item.id, item.qty + 1)}>+</button>
                </div>
                <p className="cart-item-total">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                <button className="remove-btn" onClick={() => handleRemove(item.id)}>✕</button>
              </div>
            ))}
          </div>

          <div className="cart-summary glass">
            <h2>Order Summary</h2>
            <div className="summary-row"><span>Subtotal ({cartItems.length})</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
            <div className="summary-row"><span>Delivery</span><span className="free-tag">Free</span></div>
            <div className="summary-row total"><span>Total</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
            <button className="btn-primary login-button" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </main>
  )
}
