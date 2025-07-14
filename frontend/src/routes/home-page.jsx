import { useLoaderData } from 'react-router-dom'
import { axiosInstance } from '../api/axiosInstance'
import Card from '../components/card'

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
      {feed.map(post => {
        return (
          <Card key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
          </Card>
        )
      })}
    </>
  )
}

export default HomePage
