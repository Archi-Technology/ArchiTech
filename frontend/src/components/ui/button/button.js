"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
require("./button.css");
exports.Button = react_1.default.forwardRef(({ className, variant = "default", size = "default", children, ...props }, ref) => {
    return ((0, jsx_runtime_1.jsx)("button", { className: `button ${variant} ${size} ${className || ""}`, ref: ref, ...props, children: children }));
});
exports.Button.displayName = "Button";
//# sourceMappingURL=button.js.map