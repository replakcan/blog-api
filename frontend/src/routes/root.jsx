import '../styles/root.css'
import { Outlet, useNavigate } from 'react-router-dom'
import UserContext from '../user-context'
import { useEffect, useState } from 'react'
import { axiosInstance } from '../api/axiosInstance'
import RootHeader from '../components/root-header'
import useLocalStorage from '../hooks/useLocalStorage'

function Root() {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useLocalStorage('token', null)
  let navigate = useNavigate()

  useEffect(() => {
    if (!token) return

    axiosInstance
      .get('verify')
      .then(res => setCurrentUser(res.data))
      .catch(err => console.log(err))
  }, [token])

  const handleLogout = () => {
    setToken(null)
    setCurrentUser(null)

    navigate('/feed')
  }

  return (
    <UserContext.Provider value={{ user: currentUser }}>
      <section className="root">
        <RootHeader user={currentUser} handleLogout={handleLogout} />
        <main className="root-main">
          <Outlet context={{ setToken }} />
        </main>
      </section>
    </UserContext.Provider>
  )
}

export default Root
