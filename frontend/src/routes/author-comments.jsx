import { useEffect, useState } from 'react'
import CommentCard from '../components/comment-card'
import { axiosInstance } from '../api/axiosInstance'
import { useParams } from 'react-router-dom'

export default function AuthorComments() {
  const [comments, setComments] = useState([])
  let params = useParams()
  const { authorId } = params

  useEffect(() => {
    const fetchAuthorComments = async () => {
      try {
        const res = await axiosInstance.get(`author/${authorId}/comments`)

        setComments(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchAuthorComments()
  }, [authorId])

  if (comments.length < 1)
    return (
      <p>
        <em>No comments</em>
      </p>
    )

  return (
    <>
      {comments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </>
  )
}
