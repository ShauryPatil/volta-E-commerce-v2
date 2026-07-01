import React, { useState } from 'react'

export default function ProductCard({ product, cartItem, onAdd, onUpdateQty, onClick }) {
  const [justAdded, setJustAdded] = useState(false)

  function handleAdd(e) {
    e.stopPropagation()
    onAdd(product)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1000)
  }

  function handleQty(e, delta) {
    e.stopPropagation()
    onUpdateQty(cartItem.id, cartItem.qty + delta)
  }

  const inCart = cartItem && cartItem.qty > 0

  return (
    <div className="product-card glass" onClick={() => onClick && onClick(product)}>
      <div className="product-img">
        {product.image_url ? <img src={product.image_url} alt={product.name} /> : product.icon || '📦'}
      </div>
      <div className="product-body">
        <p className="product-brand">{product.brand || 'Volta'}</p>
        <h3 className="product-name">{product.name}</h3>
        {product.description && <p className="product-desc">{product.description}</p>}
        <div className="product-stars">
          {'★'.repeat(product.rating || 4)}{'☆'.repeat(5 - (product.rating || 4))}
        </div>
        <div className="product-footer">
          <span className="product-price">₹{Number(product.price).toLocaleString('en-IN')}</span>
          {inCart ? (
            <div className="qty-inline" onClick={e => e.stopPropagation()}>
              <button onClick={e => handleQty(e, -1)}>−</button>
              <span>{cartItem.qty}</span>
              <button onClick={e => handleQty(e, 1)}>+</button>
            </div>
          ) : (
            <button className={`add-btn ${justAdded ? 'done' : ''}`} onClick={handleAdd}>
              {justAdded ? '✓' : '+'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
