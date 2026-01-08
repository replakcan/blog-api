import { Link } from 'react-router-dom'
import '../styles/index.css'

function Index() {
  return (
    <section className="index">
      <header className="index-hero">
        <p className="index-eyebrow">Blog API</p>
        <h1 className="index-title">RAW WORDS. HARD EDGES.</h1>
        <p className="index-lede">
          A blunt blogging platform built for focus. No gloss, no fluff, just
          text, posts, and receipts.
        </p>
      </header>

      <div className="index-panels">
        <article className="index-panel">
          <h2 className="index-panel-title">Enter The Feed</h2>
          <p>Read everything. Comment on what matters. Save the rest.</p>
          <Link className="index-link" to="/feed">
            Open Feed
          </Link>
        </article>

        <article className="index-panel">
          <h2 className="index-panel-title">Join The Build</h2>
          <p>Create an account, publish your take, and keep it public.</p>
          <Link className="index-link" to="/register">
            Register
          </Link>
        </article>

        <article className="index-panel">
          <h2 className="index-panel-title">Return User</h2>
          <p>Back to work. Log in and keep the thread moving.</p>
          <Link className="index-link" to="/login">
            Log In
          </Link>
        </article>
      </div>

      <footer className="index-footer">
        <p>Navigation lives in the header. The rest is straight lines.</p>
      </footer>
    </section>
  )
}

export default Index
