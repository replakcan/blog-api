import '../styles/root.css'
import { Outlet } from 'react-router-dom'
import TestContext from '../test-context'
import { useEffect, useState } from 'react'
import { axiosInstance } from '../api/axiosInstance'
import useLocalStorage from '../hooks/useLocalStorage'

function Root() {
  const [currentUser, setCurrentUser] = useState()
  const [token, setToken] = useLocalStorage('token', null)
  useEffect(() => {
    if (!token) return

    axiosInstance
      .get('verify')
      .then(res => setCurrentUser(res.data))
      .catch(err => console.log(err))
  }, [token])

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
