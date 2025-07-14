import { NavLink } from 'react-router-dom'

export default function HeaderLink({ to, text, ...rest }) {
  return (
    <NavLink
      to={to}
      {...rest}
      className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}
    >
      {text}
    </NavLink>
  )
}
