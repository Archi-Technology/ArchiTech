import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import "./button.css";
export const Button = React.forwardRef(({ className, variant = "default", size = "default", children, ...props }, ref) => {
    return (_jsx("button", { className: `button ${variant} ${size} ${className || ""}`, ref: ref, ...props, children: children }));
});
Button.displayName = "Button";
//# sourceMappingURL=button.js.map