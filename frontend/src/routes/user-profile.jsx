import { useContext } from 'react'
import UserContext from '../user-context'
import HeaderLink from '../components/header-link'
import '../styles/user-profile.css'
import { Outlet } from 'react-router-dom'

export default function UserProfile() {
  const { user } = useContext(UserContext)

  if (!user) {
    return <p>No user data available.</p>
  }

  const userFullname = `${user.first_name} ${user.last_name}`

  return (
    <section className="user-profile">
      <nav>
        <HeaderLink to="new-post" text="Create new post" />
        <HeaderLink to="posts" text="User posts" />
        <HeaderLink to="comments" text="User comments" />
      </nav>
      <h1>USER DETAILS</h1>
      <hr />
      <p>Fullname: {userFullname}</p>
      <p>Age: {user.age}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <Outlet />
    </section>
  )
}
