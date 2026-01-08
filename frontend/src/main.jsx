import './reset.css'
import './styles/form.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes.jsx'

const router = createBrowserRouter(routes, { basename: '/blog-api' })
const storedTheme = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const shouldUseDark = storedTheme ? storedTheme === 'dark' : prefersDark

document.documentElement.classList.toggle('theme-dark', shouldUseDark)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
