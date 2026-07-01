import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <span className="footer-logo">⚡ Volta</span>
            <p className="footer-about">Premium electronics for people who demand more.</p>
          </div>
          <div>
            <p className="footer-col-title">Shop</p>
            <div className="footer-col">
              <Link to="/shop">All Products</Link>
              <Link to="/sell">Sell With Us</Link>
            </div>
          </div>
          <div>
            <p className="footer-col-title">Account</p>
            <div className="footer-col">
              <Link to="/account">My Account</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/about">About</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 Volta Electronics. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
