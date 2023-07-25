import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import Shop from './routes/shop';
import SignIn from './routes/sign-in/sign-in';
import Index from './routes';
import './index.scss'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <Root />,
    children: [
      {index: true, element: <Index />},
      {
        path:'/shop',
        element: <Shop />,
      },
      {
        path:'/sign-in',
        element: <SignIn />
      }
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
