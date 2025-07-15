import { NavLink } from 'react-router-dom'

export default function HeaderLink({ to, text, className = '', ...rest }) {
  return (
    <NavLink
      to={to}
      {...rest}
      className={({ isActive, isPending }) => {
        let stateClass = isActive ? 'active' : isPending ? 'pending' : ''
        return `${className} ${stateClass}`.trim()
      }}
    >
      {text}
    </NavLink>
  )
}
