import Root from './routes/root'
import Index from './routes/index'
import ErrorPage from './routes/error-page'
import HomePage from './routes/home-page'

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
          },
        ],
      },
    ],
  },
]

export default routes
