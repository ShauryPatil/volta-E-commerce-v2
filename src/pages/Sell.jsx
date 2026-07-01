import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUserProducts, addProduct, updateProduct, deleteProduct } from '../services/productService.js'

const emptyForm = { name: '', price: '', description: '', icon: '📦', cat: 'Laptops' }
const catOptions = ['Laptops', 'Smartphones', 'Audio', 'Wearables', 'Monitors', 'Gaming']

export default function Sell({ user }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState(emptyForm)

  const [selectedId, setSelectedId] = useState(null)
  const [editForm, setEditForm] = useState(emptyForm)

  useEffect(() => {
    if (user) fetchProducts()
  }, [user])

  async function fetchProducts() {
    setLoading(true)
    const { data, error } = await getUserProducts(user.id)
    if (!error && data) setProducts(data)
    setLoading(false)
  }

  // ── CREATE ──
  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleAddProduct() {
    if (!form.name || !form.price) {
      alert('Name and Price required')
      return
    }
    setLoading(true)
    const { data, error } = await addProduct(user.id, form.name, Number(form.price), form.description, form.icon, form.cat)
    if (!error && data) {
      setProducts([data, ...products])
      setForm(emptyForm)
    }
    setLoading(false)
  }

  // ── READ (select for edit) ──
  function handleSelectProduct(product) {
    setSelectedId(product.id)
    setEditForm({
      name: product.name,
      price: product.price,
      description: product.description || '',
      icon: product.icon || '📦',
      cat: product.cat || 'Laptops'
    })
  }

  // ── UPDATE ──
  function handleEditChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  function isChanged() {
    const original = products.find(p => p.id === selectedId)
    if (!original) return false
    return (
      String(original.name) !== String(editForm.name) ||
      String(original.price) !== String(editForm.price) ||
      String(original.description || '') !== String(editForm.description) ||
      String(original.icon) !== String(editForm.icon) ||
      String(original.cat) !== String(editForm.cat)
    )
  }

  async function handleUpdateProduct() {
    if (!editForm.name || !editForm.price) {
      alert('Name and Price required')
      return
    }
    setLoading(true)
    const { data, error } = await updateProduct(selectedId, {
      name: editForm.name,
      price: Number(editForm.price),
      description: editForm.description,
      icon: editForm.icon,
      cat: editForm.cat
    })
    if (!error && data) {
      setProducts(products.map(p => p.id === selectedId ? data : p))
      setSelectedId(null)
      setEditForm(emptyForm)
    }
    setLoading(false)
  }

  // ── DELETE ──
  async function handleDeleteProduct(id) {
    if (!confirm('Delete this product listing?')) return
    setLoading(true)
    const { error } = await deleteProduct(id)
    if (!error) {
      setProducts(products.filter(p => p.id !== id))
      setSelectedId(null)
    }
    setLoading(false)
  }

  if (!user) {
    return (
      <main className="page-wrap">
        <div className="container">
          <span className="section-tag">Seller Dashboard</span>
          <h1 className="section-title" style={{ marginBottom: 24 }}>Sell Your Products</h1>
          <div className="empty-box glass">
            <span className="icon">🔒</span>
            <p>Login to Sell</p>
            <Link to="/login"><button className="btn-primary">Login</button></Link>
          </div>
        </div>
      </main>
    )
  }

  // ── EDIT SCREEN ──
  if (selectedId) {
    return (
      <main className="page-wrap">
        <div className="container">
          <button className="btn-secondary" style={{ marginBottom: 20 }} onClick={() => { setSelectedId(null); setEditForm(emptyForm) }} disabled={loading}>
            ← Back
          </button>

          <div className="sell-form-wrap glass">
            <div style={{ fontSize: 50, textAlign: 'center', marginBottom: 16 }}>{editForm.icon}</div>
            <h3>Edit Product</h3>

            <div className="form-group">
              <label>Product Title</label>
              <input name="name" value={editForm.name} onChange={handleEditChange} disabled={loading} />
            </div>

            <div className="form-group">
              <label>Price (₹)</label>
              <input name="price" type="number" value={editForm.price} onChange={handleEditChange} disabled={loading} />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={editForm.description} onChange={handleEditChange} disabled={loading} />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select name="cat" value={editForm.cat} onChange={handleEditChange} disabled={loading}>
                {catOptions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Icon / Emoji</label>
              <input name="icon" value={editForm.icon} onChange={handleEditChange} style={{ maxWidth: 90 }} disabled={loading} />
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              {isChanged() && (
                <button className="btn-primary" onClick={handleUpdateProduct} disabled={loading} style={{ flex: 1, justifyContent: 'center' }}>
                  {loading ? 'Saving...' : 'Update Product'}
                </button>
              )}
              <button className="btn-danger" onClick={() => handleDeleteProduct(selectedId)} disabled={loading}>
                {loading ? '...' : 'Delete Listing'}
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // ── LIST + ADD FORM ──
  return (
    <main className="page-wrap">
      <div className="container">
        <span className="section-tag">Seller Dashboard</span>
        <h1 className="section-title" style={{ marginBottom: 24 }}>Sell Your Products</h1>

        {products.length === 0 ? (
          <div className="empty-box glass" style={{ marginBottom: 24 }}>
            <span className="icon">📦</span>
            <p>You haven't listed any products yet.</p>
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 14 }}>{products.length} listing{products.length !== 1 ? 's' : ''}</p>
            <div className="sell-list">
              {products.map(product => (
                <div className="sell-row glass" key={product.id}>
                  <div className="sell-thumb">
                    {product.image_url ? <img src={product.image_url} alt={product.name} /> : product.icon}
                  </div>
                  <div className="sell-info">
                    <strong>{product.name}</strong>
                    <span>₹{Number(product.price).toLocaleString('en-IN')} · {product.cat}</span>
                  </div>
                  <button className="btn-secondary" onClick={() => handleSelectProduct(product)} disabled={loading}>Edit</button>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="sell-form-wrap glass">
          <h3>Add New Product</h3>

          <div className="form-group">
            <label>Product Title *</label>
            <input name="name" value={form.name} onChange={handleFormChange} placeholder="e.g. Wireless Earbuds Pro" disabled={loading} />
          </div>

          <div className="form-group">
            <label>Price (₹) *</label>
            <input name="price" type="number" value={form.price} onChange={handleFormChange} placeholder="e.g. 2999" disabled={loading} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleFormChange} placeholder="Describe your product..." disabled={loading} />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="cat" value={form.cat} onChange={handleFormChange} disabled={loading}>
              {catOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Icon / Emoji</label>
            <input name="icon" value={form.icon} onChange={handleFormChange} placeholder="📦" style={{ maxWidth: 90 }} disabled={loading} />
          </div>

          <button className="btn-primary" onClick={handleAddProduct} disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? 'Adding...' : '+ Add Product'}
          </button>
        </div>
      </div>
    </main>
  )
}
