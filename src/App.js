import React, { useState } from 'react';
import './App.css'

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Search from './pages/Search';

// components
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import Payment from './components/Payment';
import Chat from './components/chatbot/Chat'

import {BsFillChatLeftFill} from 'react-icons/bs'

// layout
const Layout = () => {
  
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/products/:id', element: <Products /> },
      { path: '/product/:id', element: <ProductDetails /> },
      { path: '/search', element: <Search /> },
      { path: '/login', element: <LoginPage/>},
      { path : '/payment', element: <Payment/>},
      { path : '/chat', element: <Chat/>}
    ],
  },
]);

const App = () => {
  const [openChat, setOpenChat] = useState(false);
  return (
    <div className='relative '>
      <RouterProvider router={router} />
      <BsFillChatLeftFill className='chaticon' onClick={()=>setOpenChat(!openChat)} ></BsFillChatLeftFill>
      <div className='absolute z-50 '>
        {openChat ? <Chat/>: ''}
      </div>
      
      
    </div>
  );
};

export default App;
