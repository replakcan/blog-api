import { useContext } from 'react'
import TestContext from '../test-context'

export default function ContextTest() {
  const { username, email } = useContext(TestContext)

  return (
    <>
      <p>{username}</p>
      <p>{email}</p>
    </>
  )
}
