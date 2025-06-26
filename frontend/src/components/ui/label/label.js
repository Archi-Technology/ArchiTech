"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
require("./label.css");
exports.Label = react_1.default.forwardRef(({ className, ...props }, ref) => {
    return (0, jsx_runtime_1.jsx)("label", { className: `label ${className || ""}`, ref: ref, ...props });
});
exports.Label.displayName = "Label";
//# sourceMappingURL=label.js.map