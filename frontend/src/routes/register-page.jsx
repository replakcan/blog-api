import { useState } from 'react'
import { axiosInstance } from '../api/axiosInstance'

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

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: name === 'age' ? Number(value) : value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await axiosInstance.post('register', formData)
      console.log('Register success:', res.data)

      setFormData({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        age: '',
        password: '',
        role: ''
      })
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

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Form</h2>
      <div>
        <label>First Name:</label>
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
      </div>

      <div>
        <label>Last Name:</label>
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
      </div>

      <div>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </div>

      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="name" />
      </div>

      <div>
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
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

      <div>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="">Select role</option>
          <option value="READER">Reader</option>
          <option value="AUTHOR">Author</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  )
}
