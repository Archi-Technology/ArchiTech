"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("@fontsource/heebo");
const google_1 = require("@react-oauth/google");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const react_router_dom_1 = require("react-router-dom");
const App_1 = __importDefault(require("./App"));
const userContext_1 = require("./contexts/userContext");
const canvasContext_1 = require("./contexts/canvasContext");
react_dom_1.default.render((0, jsx_runtime_1.jsx)(google_1.GoogleOAuthProvider, { clientId: "464195986105-qc87re38cv3f240asmsim13sfkbvn99g.apps.googleusercontent.com", children: (0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsx)(userContext_1.UserProvider, { children: (0, jsx_runtime_1.jsx)(canvasContext_1.CanvasProvider, { children: (0, jsx_runtime_1.jsx)(App_1.default, {}) }) }) }) }) }), document.getElementById('root'));
//# sourceMappingURL=index.js.map