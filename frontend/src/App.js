"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
const feed_1 = require("./components/feed");
const landing_page_1 = __importDefault(require("./components/landing-page"));
const loginWrapper_1 = require("./components/loginWrapper");
const navbar_1 = __importDefault(require("./components/navbar"));
require("./index.scss");
const Login_1 = require("./views/Login");
const Projects_1 = __importDefault(require("./views/Project/Projects"));
const dashboard_1 = __importDefault(require("./views/Dashboard/dashboard"));
const serviceContext_1 = require("./contexts/serviceContext"); // Import ServiceProvider
const App = () => {
    return ((0, jsx_runtime_1.jsx)(serviceContext_1.ServiceProvider, { children: (0, jsx_runtime_1.jsxs)("div", { className: "whole-app", children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/landing", element: (0, jsx_runtime_1.jsx)(landing_page_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/landing", replace: true }) }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, { element: (0, jsx_runtime_1.jsx)(loginWrapper_1.LoginWrapper, {}), children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, { element: (0, jsx_runtime_1.jsx)(MainLayout, {}), children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/home", element: (0, jsx_runtime_1.jsx)(feed_1.Feed, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/dashboard", element: (0, jsx_runtime_1.jsx)(dashboard_1.default, {}) })] }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/projects", element: (0, jsx_runtime_1.jsx)(Projects_1.default, {}) })] }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(Login_1.LoginScreen, {}) })] }), (0, jsx_runtime_1.jsx)(react_toastify_1.ToastContainer, { position: "bottom-left" })] }) }));
};
const MainLayout = () => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {})] }));
exports.default = App;
//# sourceMappingURL=App.js.map