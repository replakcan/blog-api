import { useContext } from 'react'
import UserContext from '../user-context'
import CommentCard from '../components/comment-card'

export default function UserComments() {
  const { user } = useContext(UserContext)

  const comments = user.comments

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
