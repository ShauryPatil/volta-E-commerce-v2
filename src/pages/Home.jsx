import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/productService.js'
import { addToCart, getCartItems, updateCartQty } from '../services/cartService.js'
import ProductCard from '../components/ProductCard.jsx'

const cats = [
  { icon: '💻', name: 'Laptops' },
  { icon: '📱', name: 'Smartphones' },
  { icon: '🎧', name: 'Audio' },
  { icon: '⌚', name: 'Wearables' },
  { icon: '🖥️', name: 'Monitors' },
  { icon: '🎮', name: 'Gaming' },
]

export default function Home({ user, onCartChange }) {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    if (user) loadCart()
    else setCartItems([])
  }, [user])

  async function loadProducts() {
    const { data, error } = await getProducts()
    if (!error && data) setProducts(data)
  }

  async function loadCart() {
    const { data, error } = await getCartItems(user.id)
    if (!error && data) setCartItems(data)
  }

  async function handleAdd(product) {
    if (!user) {
      alert('Please login first')
      return
    }
    const { data, error } = await addToCart(user.id, product.id, product.name, product.price, product.icon, 1)
    if (!error && data) {
      await loadCart()
      onCartChange()
    }
  }

  async function handleUpdateQty(cartId, qty) {
    if (qty < 1) return
    const { data, error } = await updateCartQty(cartId, qty)
    if (!error && data) {
      await loadCart()
      onCartChange()
    }
  }

  function getCartItem(productId) {
    return cartItems.find(i => i.product_id === productId) || null
  }

  return (
    <main className="page-wrap" style={{ paddingTop: 0 }}>
      <section className="hero">
        <div className="container">
          <div className="hero-card glass">
            <span className="section-tag">New arrivals 2026</span>
            <h1>Power Your <span>World.</span></h1>
            <p>Premium electronics engineered for people who demand more. From laptops to audiophile gear.</p>
            <div className="hero-actions">
              <Link to="/shop"><button className="btn-primary">Shop Now →</button></Link>
              <Link to="/sell"><button className="btn-secondary">Start Selling</button></Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><strong>{products.length}+</strong><span>Products</span></div>
              <div className="hero-stat"><strong>50K+</strong><span>Customers</span></div>
              <div className="hero-stat"><strong>4.9★</strong><span>Rating</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-tag">Browse by type</span>
              <h2 className="section-title">Shop by Category</h2>
            </div>
            <Link to="/shop"><button className="btn-secondary">View All</button></Link>
          </div>
          <div className="cat-grid">
            {cats.map(c => (
              <Link to="/shop" key={c.name}>
                <div className="cat-card glass">
                  <span className="cat-icon">{c.icon}</span>
                  <p className="cat-name">{c.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {products.length > 0 && (
        <section className="products-section">
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-tag">Handpicked for you</span>
                <h2 className="section-title">Featured Products</h2>
              </div>
              <Link to="/shop"><button className="btn-secondary">View All</button></Link>
            </div>
            <div className="products-grid">
              {products.slice(0, 4).map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  cartItem={getCartItem(p.id)}
                  onAdd={handleAdd}
                  onUpdateQty={handleUpdateQty}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="trust">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item glass"><span className="trust-icon">🚀</span><strong>Free Delivery</strong><p>On orders above ₹999</p></div>
            <div className="trust-item glass"><span className="trust-icon">🔒</span><strong>Secure Payments</strong><p>UPI, cards, wallets</p></div>
            <div className="trust-item glass"><span className="trust-icon">↩️</span><strong>Easy Returns</strong><p>7-day return policy</p></div>
            <div className="trust-item glass"><span className="trust-icon">💬</span><strong>24/7 Support</strong><p>Always here for you</p></div>
          </div>
        </div>
      </section>
    </main>
  )
}
