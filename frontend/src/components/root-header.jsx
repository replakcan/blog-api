import { useContext } from 'react'
import TestContext from '../test-context'
import HeaderLink from './header-link'

export default function RootHeader({ handleLogout }) {
  const { user } = useContext(TestContext)

  return (
    <header className="root-header">
      <nav>
        {user ? <HeaderLink to="/" text="Logout" onClick={handleLogout} /> : <HeaderLink to="/login" text="Login" />}
        <HeaderLink to="/home" text="Home" />
        {user && <HeaderLink to="/profile" text="Profile" />}
      </nav>
    </header>
  )
}
