import { useState } from 'react'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [token, setToken] = useLocalStorage('token', null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:3000/login', formData)

      setToken(res.data.token)
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </div>

      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>

      <button type="submit">Login</button>
    </form>
  )
}
