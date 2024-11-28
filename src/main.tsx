import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppRouter } from '@/routes/AppRouter';
import { GoogleOAuthProvider } from '@react-oauth/google' 
const googleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientID}>
        <AppRouter />
    </GoogleOAuthProvider>
  </StrictMode>,
);