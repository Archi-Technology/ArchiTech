"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feed = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const material_1 = require("@mui/material");
const cloud_assistant_1 = require("../cloud-assistant");
const code_panel_1 = __importDefault(require("../code-panel"));
const diagram_canvas_1 = __importDefault(require("../diagram-canvas"));
const neededAssistantCheck_1 = __importDefault(require("../neededAssistantCheck"));
const service_sidebar_1 = __importDefault(require("../service-sidebar"));
const Chat_1 = __importDefault(require("../Chat"));
require("./index.scss");
const Feed = () => {
    const [isPopupOpen, setIsPopupOpen] = (0, react_1.useState)(false);
    const canvasRef = (0, react_1.useRef)(null);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const openPopup = (0, react_1.useCallback)(() => {
        setIsPopupOpen(true);
    }, []);
    const closePopup = (0, react_1.useCallback)(() => {
        setIsPopupOpen(false);
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "container", children: [(0, jsx_runtime_1.jsx)(material_1.Box, { p: 2, children: (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "contained", color: "primary", onClick: () => navigate("/dashboard"), children: "Go to Dashboard" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mainContent", children: [(0, jsx_runtime_1.jsx)(service_sidebar_1.default, { canvasRef: canvasRef }), (0, jsx_runtime_1.jsx)("div", { className: "canvasContainer", children: (0, jsx_runtime_1.jsx)(diagram_canvas_1.default, { ref: canvasRef }) }), (0, jsx_runtime_1.jsx)("div", { className: "codePanel", children: (0, jsx_runtime_1.jsx)(code_panel_1.default, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "aiChatPanel", children: (0, jsx_runtime_1.jsx)(Chat_1.default, {}) })] }), (0, jsx_runtime_1.jsx)(neededAssistantCheck_1.default, { openPopup: openPopup }), isPopupOpen && (0, jsx_runtime_1.jsx)(cloud_assistant_1.CloudAssistantPopup, { onClose: closePopup })] }));
};
exports.Feed = Feed;
//# sourceMappingURL=index.js.map