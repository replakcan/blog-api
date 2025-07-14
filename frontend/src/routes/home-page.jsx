import { Fragment } from 'react'
import { useLoaderData } from 'react-router-dom'
import { axiosInstance } from '../api/axiosInstance'

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
          <Fragment key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
          </Fragment>
        )
      })}
    </>
  )
}

export default HomePage
