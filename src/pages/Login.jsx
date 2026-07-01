import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp, signIn } from '../services/authService.js'

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
  setLoading(true)

  if (isSignUp) {
    const { data, error } = await signUp(email, password)
    if (error) {
      alert('Signup error: ' + error.message)
    } else {
      onLoginSuccess(data.user)
      navigate('/')
    }
  } else {
    const { data, error } = await signIn(email, password)
    if (error) {
      alert('Login error: ' + error.message)
    } else {
      onLoginSuccess(data.user)
      navigate('/')
    }
  }

  setLoading(false)
}

  return (
    <div className="login-page">
      <div className="glass login-card">
        <div className="login-header">
          <h1>⚡ Volta</h1>
          <p>{isSignUp ? 'Create your account' : 'Welcome back'}</p>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button className="btn-primary login-button" onClick={handleSubmit} disabled={loading}>
          {loading ? '...' : isSignUp ? 'Sign Up' : 'Login'}
        </button>

        <div className="auth-toggle">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          {' '}
          <span onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? 'Login' : 'Sign Up'}</span>
        </div>
      </div>
    </div>
  )
}