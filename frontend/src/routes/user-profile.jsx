import { useContext } from 'react'
import UserContext from '../user-context'
import HeaderLink from '../components/header-link'
import '../styles/user-profile.css'
import { Outlet } from 'react-router-dom'

export default function UserProfile() {
  const { user } = useContext(UserContext)

  if (!user) {
    return <p className="user-profile-empty">No user data available.</p>
  }

  return (
    <section className="user-profile">
      <header className="user-profile-header">
        <p className="user-profile-eyebrow">Profile</p>
        <h2 className="user-profile-title">@{user.username}</h2>
        <p className="user-profile-subtitle">
          {user.first_name} {user.last_name}
        </p>
      </header>

      <nav className="user-profile-nav">
        <HeaderLink to="new-post" text="Create a new post" />
        <HeaderLink to="posts" text="User posts" />
        <HeaderLink to="comments" text="User comments" />
      </nav>
      <div className="user-profile-body">
        <Outlet />
      </div>
    </section>
  )
}
