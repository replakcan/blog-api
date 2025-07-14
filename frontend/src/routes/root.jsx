import '../styles/root.css'
import { Outlet } from 'react-router-dom'
import TestContext from '../test-context'
import { useState } from 'react'

function Root() {
  const [currentUser, setCurrentUser] = useState()

  return (
    <TestContext.Provider value={{ user: currentUser }}>
      <section className="root">
        <header className="root-header">
          <p>header</p>
        </header>
        <aside className="root-sidebar">
          <p>sidebar</p>
        </aside>
        <main className="root-main">
          <Outlet context={{ setToken }} />
        </main>
      </section>
    </TestContext.Provider>
  )
}

export default Root
