import type React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Feed } from './components/feed';
import LandingPage from './components/landing-page';
import { LoginWrapper } from './components/loginWrapper';
import Navbar from './components/navbar';
import './index.scss';
import { LoginScreen } from './views/Login';
import Projects from './views/Project/Projects';
import Dashboard from './views/Dashboard/dashboard';
import { ServiceProvider } from './contexts/serviceContext'; // Import ServiceProvider

const App: React.FC = () => {
  return (
    <ServiceProvider>
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
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/projects" element={<Projects />} />
        </Route>

          {/* Login route */}
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
        <ToastContainer position="bottom-left" />
      </div>
    </ServiceProvider>
  );
};

const MainLayout: React.FC = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default App;
