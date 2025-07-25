import { useLoaderData } from 'react-router-dom'
import { axiosInstance } from '../api/axiosInstance'
import PostCard from '../components/post-card'

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  try {
    const response = await axiosInstance.get('posts')

    const feed = response.data

    return { feed }
  } catch (error) {
    console.log(error)
  }
}

function HomePage() {
  const { feed } = useLoaderData()

  return (
    <>
      {feed.map(post => (
        <PostCard key={post.id} post={post} comments={post.comments} />
      ))}
    </>
  )
}

export default HomePage
