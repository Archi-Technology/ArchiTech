'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LandingPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
require("./index.scss");
const logo_png_1 = __importDefault(require("../../assets/logo.png"));
const layersIcon_png_1 = __importDefault(require("../../assets/layersIcon.png"));
const cloudIcon_png_1 = __importDefault(require("../../assets/cloudIcon.png"));
const cursorIcon_png_1 = __importDefault(require("../../assets/cursorIcon.png"));
const networkIcon_png_1 = __importDefault(require("../../assets/networkIcon.png"));
const terraformIcon_png_1 = __importDefault(require("../../assets/terraformIcon.png"));
function LandingPage() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const containerRef = (0, react_1.useRef)(null);
    const handleLoginClick = () => {
        navigate('/login');
    };
    // Add parallax effect based on mouse movement
    (0, react_1.useEffect)(() => {
        const container = containerRef.current;
        if (!container)
            return;
        const handleMouseMove = (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            const elements = container.querySelectorAll('.bg-element');
            elements.forEach((el) => {
                const element = el;
                const speed = Number.parseFloat(element.getAttribute('data-speed') || '0.05');
                const xOffset = (x - 0.5) * speed * 100;
                const yOffset = (y - 0.5) * speed * 100;
                element.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "landing-container", ref: containerRef, children: [(0, jsx_runtime_1.jsx)("header", { className: "landing-header", children: (0, jsx_runtime_1.jsx)("div", { className: "logo-container", children: (0, jsx_runtime_1.jsx)("img", { src: logo_png_1.default, alt: "ArchiTech Logo", className: "logo-image" }) }) }), (0, jsx_runtime_1.jsxs)("main", { className: "landing-main", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-element layers-icon floating", "data-speed": "0.05", children: (0, jsx_runtime_1.jsx)("img", { src: layersIcon_png_1.default, alt: "Layers", className: "icon-image" }) }), (0, jsx_runtime_1.jsx)("div", { className: "bg-element cloud-icon floating-reverse", "data-speed": "0.03", children: (0, jsx_runtime_1.jsx)("img", { src: cloudIcon_png_1.default, alt: "Cloud", className: "icon-image" }) }), (0, jsx_runtime_1.jsx)("div", { className: "bg-element cursor-icon floating-slow", "data-speed": "0.08", children: (0, jsx_runtime_1.jsx)("img", { src: cursorIcon_png_1.default, alt: "Cursor", className: "icon-image" }) }), (0, jsx_runtime_1.jsx)("div", { className: "bg-element network-icon floating-diagonal", "data-speed": "0.04", children: (0, jsx_runtime_1.jsx)("img", { src: networkIcon_png_1.default, alt: "Network", className: "icon-image" }) }), (0, jsx_runtime_1.jsx)("div", { className: "bg-element terraform-icon floating-rotate", "data-speed": "0.06", children: (0, jsx_runtime_1.jsx)("img", { src: terraformIcon_png_1.default, alt: "Terraform", className: "icon-image" }) }), (0, jsx_runtime_1.jsx)("div", { className: "particles", children: [...Array(15)].map((_, i) => ((0, jsx_runtime_1.jsx)("div", { className: `particle particle-${i % 5}` }, i))) }), (0, jsx_runtime_1.jsxs)("div", { className: "content", children: [(0, jsx_runtime_1.jsx)("h1", { className: "title", children: "ArchiTech" }), (0, jsx_runtime_1.jsx)("p", { className: "subtitle", children: "One Click Architecture" }), (0, jsx_runtime_1.jsxs)("button", { className: "login-button pulse", onClick: handleLoginClick, children: ["Login ", (0, jsx_runtime_1.jsx)("span", { className: "arrow", children: "\u2192" })] })] })] })] }));
}
//# sourceMappingURL=index.js.map