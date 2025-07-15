import { useContext } from 'react'
import TestContext from '../test-context'
import PostCard from '../components/post-card'

export default function UserPosts() {
  const { user } = useContext(TestContext)
  console.log(user)

  const posts = user.posts

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
