import type React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Feed } from './components/feed';
import LandingPage from './components/landing-page';
import { LoginWrapper } from './components/loginWrapper';
import Navbar from './components/navbar';
import './index.scss';
import { LoginScreen } from './views/Login';

const App: React.FC = () => {
  return (
    <div className="whole-app">
      <Routes>
        {/* Landing page route */}
        <Route path="/landing" element={<LandingPage />} />

        {/* Default route redirects to landing page */}
        <Route path="/" element={<Navigate to="/landing" replace />} />

        {/* Protected routes */}
        <Route element={<LoginWrapper />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Feed />} />
          </Route>
        </Route>

        {/* Login route */}
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

const MainLayout: React.FC = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default App;
