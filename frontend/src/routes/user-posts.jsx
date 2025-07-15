import { useContext, useEffect, useState } from 'react'
import UserContext from '../user-context'
import PostCard from '../components/post-card'
import { axiosInstance } from '../api/axiosInstance'

export default function UserPosts() {
  const { user } = useContext(UserContext)
  const [posts, setPosts] = useState(user.posts)

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axiosInstance.get(`author/${user.id}/posts`)

        setPosts(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUserPosts()
  }, [user.id])

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
