import Card from './card'

export default function PostCard({ post }) {
  return (
    <Card>
      <h1>{post.title}</h1>
      <p>{post.text}</p>
    </Card>
  )
}
