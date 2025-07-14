import { createContext } from 'react'

const TestContext = createContext({
  user: {
    id: '',
    first_name: '',
    last_name: '',
    age: '',
    username: '',
    email: '',
    role: ''
  }
})

export default TestContext
