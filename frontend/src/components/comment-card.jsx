import { Link, useLocation } from 'react-router-dom'
import Card from './card'

export default function CommentCard({ comment }) {
  let location = useLocation()

  const isOnCommentsPage = location.pathname.includes('/comments')

  return (
    <Card>
      <div>{isOnCommentsPage && <Link to={`/posts/${comment.postId}`}>Go to related post</Link>}</div>
      <p>{comment.text}</p>
    </Card>
  )
}
