"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Textarea = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
require("./textarea.css");
exports.Textarea = react_1.default.forwardRef(({ className, ...props }, ref) => {
    return (0, jsx_runtime_1.jsx)("textarea", { className: `textarea ${className || ""}`, ref: ref, ...props });
});
exports.Textarea.displayName = "Textarea";
//# sourceMappingURL=textarea.js.map