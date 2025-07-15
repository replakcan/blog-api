import { useContext } from 'react'
import TestContext from '../test-context'
import HeaderLink from './header-link'

export default function RootHeader({ handleLogout }) {
  const { user } = useContext(TestContext)

  return (
    <header className="root-header">
      <nav>
        <HeaderLink to="/feed" text="Feed" />
        {user && <HeaderLink to="/profile" text="Profile" />}
        {user ? <HeaderLink to="/" text="Logout" onClick={handleLogout} /> : <HeaderLink to="/login" text="Login" />}
      </nav>
    </header>
  )
}
