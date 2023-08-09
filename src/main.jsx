import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { UserProvider } from './context/user';
import { ProductsProvider } from './context/product';
import Root from './routes/root';
import Shop from './routes/shop/shop';
import Authentication from './routes/authentication/authentication';
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
        path:'/auth',
        element: <Authentication />
      },
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ProductsProvider>
        <RouterProvider router={router} />
      </ProductsProvider>
    </UserProvider>
  </React.StrictMode>,
)
