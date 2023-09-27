import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { UserProvider } from './context/user';
import { ProductsProvider } from './context/product';
import { CartProvider } from './context/cart-context';
import Root from './routes/root';
import Shop from './routes/shop/shop';
import Authentication from './routes/authentication/authentication';
import Checkout from './routes/checkout/checkout';
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
      {
        path: '/checkout',
        element: <Checkout />
      }
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ProductsProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ProductsProvider>
    </UserProvider>
  </React.StrictMode>,
)
