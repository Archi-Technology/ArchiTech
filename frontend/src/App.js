import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
const App = () => {
    return (_jsx(ServiceProvider, { children: _jsxs("div", { className: "whole-app", children: [_jsxs(Routes, { children: [_jsx(Route, { path: "/landing", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/landing", replace: true }) }), _jsxs(Route, { element: _jsx(LoginWrapper, {}), children: [_jsxs(Route, { element: _jsx(MainLayout, {}), children: [_jsx(Route, { path: "/home", element: _jsx(Feed, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) })] }), _jsx(Route, { path: "/projects", element: _jsx(Projects, {}) })] }), _jsx(Route, { path: "/login", element: _jsx(LoginScreen, {}) })] }), _jsx(ToastContainer, { position: "bottom-left" })] }) }));
};
const MainLayout = () => (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx(Outlet, {})] }));
export default App;
//# sourceMappingURL=App.js.map