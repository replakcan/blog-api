import Root from './routes/root'
import Index from './routes/index'
import ErrorPage from './routes/error-page'
import HomePage from './routes/home-page'
import LoginPage from './routes/login-page'
import RegisterPage from './routes/register-page'
import ContextTest from './routes/context-test'
import { loader as feedLoader } from './routes/home-page'
import UserProfile from './routes/user-profile'
import NewPostForm from './routes/new-post-form'
import UserPosts from './routes/user-posts'
import UserComments from './routes/user-comments'

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
            path: 'feed',
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
          },
          {
            path: 'profile',
            element: <UserProfile />,
            errorElement: <ErrorPage />,
            children: [
              {
                path: 'new-post',
                element: <NewPostForm />
              },
              {
                path: 'posts',
                element: <UserPosts />
              },
              {
                path: 'comments',
                element: <UserComments />
              }
            ]
          }
        ]
      }
    ]
  }
]

export default routes
