import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import "./textarea.css";
export const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return _jsx("textarea", { className: `textarea ${className || ""}`, ref: ref, ...props });
});
Textarea.displayName = "Textarea";
//# sourceMappingURL=textarea.js.map