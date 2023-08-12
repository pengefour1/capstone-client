import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// cart provider
import CartProvider from './context/CartContext';
import LoginProvider from './context/LoginContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LoginProvider>
    <CartProvider>
      <App />
      
    </CartProvider>
  </LoginProvider>
    
  
);
