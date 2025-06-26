"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
require("./input.css");
exports.Input = react_1.default.forwardRef(({ className, type = "text", ...props }, ref) => {
    return (0, jsx_runtime_1.jsx)("input", { type: type, className: `input ${className || ""}`, ref: ref, ...props });
});
exports.Input.displayName = "Input";
//# sourceMappingURL=input.js.map