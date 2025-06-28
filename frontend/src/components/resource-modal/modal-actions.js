"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ModalActions({ onClose, onConfirm }) {
    return (_jsxs("div", { className: "actions", children: [_jsx("button", { className: "button secondary", onClick: onClose, children: "Cancel" }), _jsx("button", { className: "button primary", onClick: () => {
                    onConfirm();
                    onClose();
                }, children: "Confirm Selection" })] }));
}
//# sourceMappingURL=modal-actions.js.map