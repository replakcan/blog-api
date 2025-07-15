import { useContext } from 'react'
import UserContext from '../user-context'
import HeaderLink from './header-link'

export default function RootHeader({ handleLogout }) {
  const { user } = useContext(UserContext)

  return (
    <header className="root-header">
      <nav>
        <HeaderLink to="/feed" text="Feed" />
        {user && <HeaderLink to="/profile" text="Profile" />}
        {!user && <HeaderLink className="register-btn" to="/register" text="Register" />}
        {user ? (
          <HeaderLink className="logout-btn" to="/" text="Logout" onClick={handleLogout} />
        ) : (
          <HeaderLink className="login-btn" to="/login" text="Login" />
        )}
      </nav>

      {user && <span className='online-user'>{user.username}</span>}
    </header>
  )
}
