import { useEffect, useState } from 'react'
import { axiosInstance } from '../api/axiosInstance'
import Card from './card'
import { NavLink, Outlet } from 'react-router-dom'
import '../styles/author-card.css'

export default function AuthorCard({ authorId }) {
  const [author, setAuthor] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    age: '',
    role: '',
    posts: [],
    comments: []
  })

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await axiosInstance.get(`author/${authorId}`)

        setAuthor(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchAuthor()
  }, [authorId])

  return (
    <div>
      <Card>
        <h1>@{author.username}</h1>
        <h2>Fullname: {`${author.first_name} ${author.last_name}`} </h2>
        <h3>Email: {author.email}</h3>
        <h3>Age: {author.age}</h3>
        <h4>Role: {author.role}</h4>
        <div className="profile-links">
          <NavLink to="posts">
            {author.posts.length} {author.posts.length == 1 ? 'post' : 'posts'} created
          </NavLink>
          <NavLink to="comments">
            {author.comments.length} {author.comments.length == 1 ? 'comment' : 'comments'} made
          </NavLink>
        </div>
      </Card>
      <Outlet />
    </div>
  )
}
