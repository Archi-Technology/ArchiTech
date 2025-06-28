import { jsx as _jsx } from "react/jsx-runtime";
import '@fontsource/heebo';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './contexts/userContext';
import { CanvasProvider } from './contexts/canvasContext';
ReactDOM.render(_jsx(GoogleOAuthProvider, { clientId: "464195986105-qc87re38cv3f240asmsim13sfkbvn99g.apps.googleusercontent.com", children: _jsx(React.StrictMode, { children: _jsx(BrowserRouter, { children: _jsx(UserProvider, { children: _jsx(CanvasProvider, { children: _jsx(App, {}) }) }) }) }) }), document.getElementById('root'));
//# sourceMappingURL=index.js.map