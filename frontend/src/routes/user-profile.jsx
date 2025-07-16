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


  return (
    <section className="user-profile">
      <nav>
        <HeaderLink to="new-post" text="Create a new post" />
        <HeaderLink to="posts" text="User posts" />
        <HeaderLink to="comments" text="User comments" />
      </nav>
      <Outlet />
    </section>
  )
}
