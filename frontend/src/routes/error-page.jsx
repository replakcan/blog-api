import { NavLink, useRouteError } from 'react-router-dom'
import '../styles/error-page.css'

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <section className="error-page">
      <header className="error-hero">
        <p className="error-eyebrow">System</p>
        <h1 className="error-title">Hard Stop</h1>
        <p className="error-subtitle">Something broke. The route is sealed.</p>
      </header>

      <div className="error-body">
        <p className="error-lede">Sorry, an unexpected error has occurred.</p>
        <p className="error-detail">{error.statusText || error.message}</p>
        <NavLink className="error-link" to="/">
          Go Back Home
        </NavLink>
      </div>
    </section>
  )
}
