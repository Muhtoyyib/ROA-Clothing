import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Elements } from '@stripe/react-stripe-js';
import { stripePromise }from './utils/stripe/stripe.utils';

import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
// import { UserProvider } from './context/user';
// import { CategoriesProvider } from './context/categories-map';
// import { CartProvider } from './context/cart-context';
import Root from './routes/root/root';
import Shop from './routes/shop/shop';
import CategoryShop, {loader as categoryShopLoader} from './routes/category-shop/category-shop';
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
        path: 'shop/:categoryName',
        element: <CategoryShop />,
        loader: categoryShopLoader
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
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>
    </PersistGate>
  </Provider>
  </React.StrictMode>,
)
