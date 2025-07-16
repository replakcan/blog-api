import { useEffect, useState } from 'react'
import PostCard from '../components/post-card'
import { axiosInstance } from '../api/axiosInstance'
import { useParams } from 'react-router-dom'

export default function AuthorPosts() {
  const [posts, setPosts] = useState([])
  let params = useParams()
  const { authorId } = params

  useEffect(() => {
    const fetchAuthorPosts = async () => {
      try {
        const res = await axiosInstance.get(`author/${authorId}/posts`)

        setPosts(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchAuthorPosts()
  }, [authorId])

  if (posts.length < 1)
    return (
      <p>
        <em>No posts</em>
      </p>
    )

  return (
    <>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  )
}
