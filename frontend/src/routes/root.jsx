import { Outlet } from 'react-router-dom'

function Root() {
  return (
    <>
      <h1>Root component</h1>
      <Outlet />
    </>
  )
}

export default Root
