import { useState } from 'react'
import { axiosInstance } from '../api/axiosInstance'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import '../styles/login-page.css'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const { setToken } = useOutletContext()
  let navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await axiosInstance.post('login', formData)

      setToken(res.data.token)
      navigate('/feed')
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message)
    }
  }

  return (
    <section className="login">
      <header className="login-header">
        <p className="login-eyebrow">Access</p>
        <h2 className="login-title">Sign In</h2>
        <p className="login-subtitle">Keep it sharp. No frills.</p>
      </header>

      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-field">
          <span>Username</span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </label>

        <label className="login-field">
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </label>

        <div className="login-actions">
          <button className="login-button" type="submit">
            Login
          </button>
          <Link className="login-alt" to="/register">
            Register Instead
          </Link>
        </div>
      </form>
    </section>
  )
}
