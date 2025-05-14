import '@fontsource/heebo';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './contexts/userContext';
import { CanvasProvider } from './contexts/canvasContext';

ReactDOM.render(
  <GoogleOAuthProvider clientId="464195986105-qc87re38cv3f240asmsim13sfkbvn99g.apps.googleusercontent.com">
    <React.StrictMode>
      <BrowserRouter>
        <UserProvider>
          <CanvasProvider>
            <App />
          </CanvasProvider>
        </UserProvider>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root'),
);
