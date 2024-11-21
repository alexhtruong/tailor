import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './pages/login';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='602617008775-btpa0bvs49tku9lipfa53k66kfeiekq0.apps.googleusercontent.com'>
      <BrowserRouter>
        {/* <Login /> */}
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);