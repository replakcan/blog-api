import { useContext, useState } from 'react'
import { axiosInstance } from '../api/axiosInstance'
import UserContext from '../user-context'
import { useNavigate } from 'react-router-dom'
import '../styles/new-post-form.css'

export default function NewPostForm() {
  const { user } = useContext(UserContext)
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

      navigate('/profile/posts')
    } catch (err) {
      console.error('Failed to create post:', err.response?.data || err.message)
    }
  }

  return (
    <section className="new-post">
      <header className="new-post-header">
        <p className="new-post-eyebrow">Compose</p>
        <h3 className="new-post-title">New Post</h3>
        <p className="new-post-subtitle">Keep it sharp. Short lines, strong takes.</p>
      </header>

      <form onSubmit={handleSubmit} className="new-post-form">
        <label className="new-post-field" htmlFor="title">
          <span>Title</span>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required />
        </label>

        <label className="new-post-field" htmlFor="text">
          <span>Text</span>
          <textarea name="text" id="text" value={formData.text} onChange={handleChange} rows="6" required />
        </label>

        <button className="new-post-button" type="submit">
          Create Post
        </button>
      </form>
    </section>
  )
}
