import { useContext, useState } from 'react'
import { axiosInstance } from '../api/axiosInstance'
import TestContext from '../test-context'
import { useNavigate } from 'react-router-dom'

export default function NewPostForm() {
  const { user } = useContext(TestContext)
  let navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    userId: user.id
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axiosInstance.post('author/posts', formData)

      setFormData({
        title: '',
        text: '',
        userId: user.id
      })

      navigate('/home')
    } catch (err) {
      console.error('Failed to create post:', err.response?.data || err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div>
        <label htmlFor="text">Text:</label>
        <textarea name="text" id="text" value={formData.text} onChange={handleChange} rows="4" required />
      </div>

      <button type="submit">Create Post</button>
    </form>
  )
}
