"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const userContext_1 = require("../../contexts/userContext");
const logoIcon_png_1 = __importDefault(require("../../assets/logoIcon.png"));
require("./index.scss"); // Import the CSS styles for the navbar
const AxiosInstance_1 = require("../../services/axios/AxiosInstance");
const Navbar = () => {
    const { setUserData, user } = (0, userContext_1.useUser)();
    const { logoutUser } = (0, userContext_1.useUser)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "navbar", children: [(0, jsx_runtime_1.jsx)("div", { className: "navbarLeft", children: (0, jsx_runtime_1.jsxs)("div", { className: "logoContainer", children: [(0, jsx_runtime_1.jsx)("img", { src: logoIcon_png_1.default, alt: "ArchiTech Logo", className: "logoImage", style: { width: 64, height: 64 } }), (0, jsx_runtime_1.jsx)("div", { className: "appName", children: "ArchiTech" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/projects", children: (0, jsx_runtime_1.jsx)("button", { className: "navButton", children: "Projects" }) })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "navbarRight", children: (0, jsx_runtime_1.jsx)("button", { className: "navButton", onClick: async () => {
                        try {
                            const response = await AxiosInstance_1.AxiosInstence.post('/auth/logout');
                            if (response.status === 200) {
                                // setUserData(null); // Clear user data
                                window.location.href = '/login'; // Redirect to login
                            }
                        }
                        catch (error) {
                            console.error('Logout failed:', error);
                        }
                    }, children: "Logout" }) })] }));
};
exports.default = Navbar;
//# sourceMappingURL=index.js.map