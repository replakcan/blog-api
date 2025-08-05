import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../api/axiosInstance'
import PostCard from '../components/post-card'

export default function PostDetails() {
  const [post, setPost] = useState(null)
  let { postId } = useParams()

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const res = await axiosInstance.get(`posts/${postId}`)

        setPost(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPostById()
  }, [postId])

  if (!post) return <div>Loading...</div>

  return <PostCard post={post} comments={post?.comments} />
}
