import Root from './routes/root'
import Index from './routes/index'
import ErrorPage from './routes/error-page'
import HomePage from './routes/home-page'
import LoginPage from './routes/login-page'
import RegisterPage from './routes/register-page'
import ContextTest from './routes/context-test'
import { loader as feedLoader } from './routes/home-page'

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: 'home',
            element: <HomePage />,
            loader: feedLoader
          },
          {
            path: 'login',
            element: <LoginPage />
          },
          {
            path: 'register',
            element: <RegisterPage />
          },
          {
            path: 'test',
            element: <ContextTest />
          }
        ]
      }
    ]
  }
]

export default routes
