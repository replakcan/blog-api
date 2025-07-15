import { useContext } from 'react'
import UserContext from '../user-context'

export default function ContextTest() {
  const { username, email } = useContext(UserContext)

  return (
    <>
      <p>{username}</p>
      <p>{email}</p>
    </>
  )
}
