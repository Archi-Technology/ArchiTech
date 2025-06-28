import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import "./label.css";
export const Label = React.forwardRef(({ className, ...props }, ref) => {
    return _jsx("label", { className: `label ${className || ""}`, ref: ref, ...props });
});
Label.displayName = "Label";
//# sourceMappingURL=label.js.map