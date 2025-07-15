import { createContext } from 'react'

const UserContext = createContext({
  user: {
    id: '',
    first_name: '',
    last_name: '',
    age: '',
    username: '',
    email: '',
    role: '',
    posts: [],
    comments: []
  }
})

export default UserContext
