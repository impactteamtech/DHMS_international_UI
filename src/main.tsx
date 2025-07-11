import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { CartProvider } from './components/Context/CartContext.tsx';
import { AuthProvider } from './components/Context/AuthContext.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <CartProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CartProvider>
      </BrowserRouter>
  </StrictMode>,
);
