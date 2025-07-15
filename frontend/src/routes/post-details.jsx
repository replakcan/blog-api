import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../api/axiosInstance'
import PostCard from '../components/post-card'

export default function PostDetails() {
  const [post, setPost] = useState({ title: '' })
  let params = useParams()

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const res = await axiosInstance.get(`posts/${params.postId}`)

        setPost(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPostById()
  }, [params.postId])

  return <PostCard post={post} comments={post.comments} />
}
