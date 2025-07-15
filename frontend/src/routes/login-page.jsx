import { useState } from 'react'
import { axiosInstance } from '../api/axiosInstance'
import { useNavigate, useOutletContext } from 'react-router-dom'

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="name"
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
      </div>

      <button type="submit">Login</button>
    </form>
  )
}
