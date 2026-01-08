import { useEffect, useRef, useState } from 'react'
import { axiosInstance } from '../api/axiosInstance'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import '../styles/register-page.css'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    age: '',
    password: '',
    role: ''
  })
  const [toastMessage, setToastMessage] = useState('')
  const [isRedirecting, setIsRedirecting] = useState(false)
  const timeoutRef = useRef(null)
  const { setToken } = useOutletContext()
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: name === 'age' ? Number(value) : value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const credentials = { username: formData.username, password: formData.password }
      const res = await axiosInstance.post('register', formData)
      console.log('Register success:', res.data)
      const registerToken = res.data?.token
      const tokenToUse = registerToken
        ? registerToken
        : (await axiosInstance.post('login', credentials)).data?.token

      if (tokenToUse) {
        setToken(tokenToUse)
      }

      setFormData({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        age: '',
        password: '',
        role: ''
      })

      setToastMessage('Redirecting to profile in 2 seconds.')
      setIsRedirecting(true)
      timeoutRef.current = window.setTimeout(() => {
        navigate('/profile')
      }, 2000)
    } catch (err) {
      if (err.response) {
        console.error('Server error:', err.response.data)
      } else {
        console.error('Request error:', err.message)
      }
    } finally {
      console.log('Register done')
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <section className="register">
      {toastMessage && <div className="register-toast">{toastMessage}</div>}
      <header className="register-header">
        <p className="register-eyebrow">Create</p>
        <h2 className="register-title">Register</h2>
        <p className="register-subtitle">Make it official. Minimal fields, max intent.</p>
      </header>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-grid">
          <label className="register-field">
            <span>First name</span>
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
          </label>

          <label className="register-field">
            <span>Last name</span>
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
          </label>

          <label className="register-field">
            <span>Username</span>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </label>

          <label className="register-field">
            <span>Email</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="name" />
          </label>

          <label className="register-field">
            <span>Age</span>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </label>

          <label className="register-field">
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

          <label className="register-field">
            <span>Role</span>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Select role</option>
              <option value="READER">Reader</option>
              <option value="AUTHOR">Author</option>
            </select>
          </label>
        </div>

        <div className="register-actions">
          <button className="register-button" type="submit" disabled={isRedirecting}>
            Register
          </button>
          <Link className="register-alt" to="/login">
            Already have an account?
          </Link>
        </div>
      </form>
    </section>
  )
}
