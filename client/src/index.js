import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthState from './contexts/auth/authState';
import AuthContext from './contexts/auth/authContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AuthState>
    <App />
  </AuthState>
  // </React.StrictMode>
);