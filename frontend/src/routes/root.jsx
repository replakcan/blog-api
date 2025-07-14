import { Outlet } from 'react-router-dom'
import TestContext from '../test-context'

function Root() {
  return (
    <TestContext.Provider value={{ user: currentUser }}>
      <h1>Root component</h1>
      <Outlet />
    </>
    </TestContext.Provider>
  )
}

export default Root
