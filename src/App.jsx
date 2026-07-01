import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChange, signOut } from './services/authService.js'
import { getCartItems } from './services/cartService.js'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Cart from './pages/Cart.jsx'
import Sell from './pages/Sell.jsx'
import Account from './pages/Account.jsx'
import './App.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const subscription = onAuthStateChange((session) => {
      setUser(session?.user || null)
      setAuthLoading(false)
    })
    return () => subscription?.unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      refreshCartCount()
    } else {
      setCartCount(0)
    }
  }, [user])

  async function refreshCartCount() {
    const { data, error } = await getCartItems(user.id)
    if (!error && data) {
      setCartCount(data.reduce((sum, item) => sum + item.qty, 0))
    }
  }

  async function handleLogout() {
    await signOut()
    setUser(null)
    setCartCount(0)
  }

  if (authLoading) {
    return (
      <div className="app-spinner-wrap">
        <div className="app-spinner" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="scene" aria-hidden="true">
        <div className="blob one" />
        <div className="blob two" />
        <div className="blob three" />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar user={user} cartCount={cartCount} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home user={user} onCartChange={refreshCartCount} />} />
          <Route path="/shop" element={<Shop user={user} onCartChange={refreshCartCount} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLoginSuccess={setUser} />} />
          <Route path="/cart" element={<Cart user={user} onCartChange={refreshCartCount} />} />
          <Route path="/sell" element={<Sell user={user} />} />
          <Route path="/account" element={<Account user={user} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
