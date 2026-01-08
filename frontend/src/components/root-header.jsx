import { useContext, useEffect, useState } from 'react'
import UserContext from '../user-context'
import HeaderLink from './header-link'

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem('theme')
  if (storedTheme === 'dark') return true
  if (storedTheme === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function RootHeader({ handleLogout }) {
  const { user } = useContext(UserContext)
  const [isDarkMode, setIsDarkMode] = useState(() => getInitialTheme())

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', isDarkMode)
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

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

      <button className="root-theme-toggle" type="button" onClick={() => setIsDarkMode(prev => !prev)}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {user && <span className="online-user">{user.username}</span>}
    </header>
  )
}
