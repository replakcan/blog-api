import { useContext, useEffect, useState } from 'react'
import UserContext from '../user-context'
import CommentCard from '../components/comment-card'
import { axiosInstance } from '../api/axiosInstance'

export default function UserComments() {
  const { user } = useContext(UserContext)
  const [comments, setComments] = useState(user.comments)

  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        const res = await axiosInstance.get(`author/${user.id}/comments`)

        setComments(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUserComments()
  }, [user.id])

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
