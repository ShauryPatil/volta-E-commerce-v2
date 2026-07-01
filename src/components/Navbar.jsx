import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function Navbar({ user, cartCount, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleLogoutClick() {
    setMenuOpen(false)
    onLogout()
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="topbar">
          <Link to="/" className="navbar-brand">
            <div className="logo">⚡</div>
            Volta
          </Link>

          <ul className="navbar-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/shop">Shop</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/sell">Sell</NavLink></li>
          </ul>

          <div className="navbar-actions">
            {user ? (
              <>
                <Link to="/cart" className="cart-badge">
                  🛒
                  {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </Link>
                <Link to="/account" className="nav-btn">👤 Account</Link>
                <button className="nav-btn" onClick={onLogout}>Logout</button>
              </>
            ) : (
              <Link to="/login" className="nav-btn">Login</Link>
            )}
          </div>

          <button
            className={`hamburger-btn${menuOpen ? ' open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <ul className="mobile-menu-links">
          <li><NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/shop" onClick={() => setMenuOpen(false)}>Shop</NavLink></li>
          <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink></li>
          <li><NavLink to="/sell" onClick={() => setMenuOpen(false)}>Sell</NavLink></li>
        </ul>
        <div className="mobile-menu-actions">
          {user ? (
            <>
              <Link to="/cart" className="nav-btn" onClick={() => setMenuOpen(false)}>
                🛒 Cart{cartCount > 0 ? ` (${cartCount})` : ''}
              </Link>
              <Link to="/account" className="nav-btn" onClick={() => setMenuOpen(false)}>👤 Account</Link>
              <button className="nav-btn" onClick={handleLogoutClick}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="nav-btn" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
