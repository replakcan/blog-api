import Card from './card'

export default function CommentCard({ comment }) {
  return (
    <Card>
      <p>{comment.text}</p>
    </Card>
  )
}
