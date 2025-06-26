"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalActions = ModalActions;
const jsx_runtime_1 = require("react/jsx-runtime");
function ModalActions({ onClose, onConfirm }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "actions", children: [(0, jsx_runtime_1.jsx)("button", { className: "button secondary", onClick: onClose, children: "Cancel" }), (0, jsx_runtime_1.jsx)("button", { className: "button primary", onClick: () => {
                    onConfirm();
                    onClose();
                }, children: "Confirm Selection" })] }));
}
//# sourceMappingURL=modal-actions.js.map