import { useContext } from 'react'
import TestContext from '../test-context'
import HeaderLink from '../components/header-link'

export default function UserProfile() {
  const { user } = useContext(TestContext)

  if (!user) {
    return <p>No user data available.</p>
  }

  const userFullname = `${user.first_name} ${user.last_name}`

  return (
    <>
      <h1>USER DETAILS</h1>
      <nav>
        <HeaderLink to="/new-post" text="Create new post" />
        <HeaderLink text="User posts" />
        <HeaderLink text="User comments" />
      </nav>
      <hr />
      <p>Fullname: {userFullname}</p>
      <p>Age: {user.age}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </>
  )
}
