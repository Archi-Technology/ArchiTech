import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import "./input.css";
export const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
    return _jsx("input", { type: type, className: `input ${className || ""}`, ref: ref, ...props });
});
Input.displayName = "Input";
//# sourceMappingURL=input.js.map