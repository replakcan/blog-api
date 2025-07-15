import { Link, useParams } from 'react-router-dom'
import Card from './card'

export default function CommentCard({ comment }) {
  let params = useParams()

  return (
    <Card>
      <div>
        <Link to={`/posts/${comment.postId}`}>{params.postId ? '' : 'Go to related post'}</Link>
      </div>
      <p>{comment.text}</p>
    </Card>
  )
}
