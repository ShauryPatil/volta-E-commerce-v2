import React, { useState, useEffect } from 'react'
import { getProducts } from '../services/productService.js'
import { addToCart, getCartItems, updateCartQty } from '../services/cartService.js'
import ProductCard from '../components/ProductCard.jsx'

const cats = ['All', 'Laptops', 'Smartphones', 'Audio', 'Wearables', 'Monitors', 'Gaming']

export default function Shop({ user, onCartChange }) {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState(null)

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

  const filtered = active === 'All' ? products : products.filter(p => p.cat === active)

  return (
    <main className="page-wrap">
      <div className="container">
        <div className="page-header">
          <h1 className="section-title">All Products</h1>
          <span className="page-count">{filtered.length} products</span>
        </div>

        <div className="filter-row">
          {cats.map(c => (
            <button key={c} className={`filter-btn ${active === c ? 'active' : ''}`} onClick={() => setActive(c)}>{c}</button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-box glass">
            <span className="icon">📦</span>
            <p>No products in this category yet.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                cartItem={getCartItem(p.id)}
                onAdd={handleAdd}
                onUpdateQty={handleUpdateQty}
                onClick={setSelected}
              />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            <div className="modal-img">
              {selected.image_url ? <img src={selected.image_url} alt={selected.name} /> : selected.icon || '📦'}
            </div>
            <p className="product-brand">{selected.brand || 'Volta'}</p>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: '8px 0' }}>{selected.name}</h2>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 16 }}>{selected.description || 'No description provided.'}</p>
            <p style={{ fontSize: 19, fontWeight: 900, color: '#fff', marginBottom: 18 }}>₹{Number(selected.price).toLocaleString('en-IN')}</p>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { handleAdd(selected); setSelected(null) }}>
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
