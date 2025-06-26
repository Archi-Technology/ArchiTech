'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginWrapper = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const userContext_1 = require("../../contexts/userContext");
const userService_1 = require("../../services/userService");
const LoginWrapper = () => {
    const authtoken = localStorage.getItem('accessToken');
    const { setUserData, user } = (0, userContext_1.useUser)();
    const { data, isLoading } = (0, userService_1.useGetUserData)(authtoken ? authtoken : null);
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        if (data) {
            setUserData(data);
        }
    }, [data, setUserData]);
    if (isLoading)
        return (0, jsx_runtime_1.jsx)(material_1.CircularProgress, {});
    // If no auth token or user, redirect to login
    if (!authtoken && !user) {
        return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/login", replace: true });
    }
    return (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {});
};
exports.LoginWrapper = LoginWrapper;
//# sourceMappingURL=index.js.map