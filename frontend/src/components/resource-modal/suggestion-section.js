"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestionSection = SuggestionSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const fa_1 = require("react-icons/fa");
function SuggestionSection({ suggestion }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "suggestion-section", children: (0, jsx_runtime_1.jsxs)("div", { className: "suggestion-container", children: [(0, jsx_runtime_1.jsx)("div", { className: "bot-icon-container", children: (0, jsx_runtime_1.jsx)(fa_1.FaRobot, { className: "bot-icon" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "suggestion-content", children: [(0, jsx_runtime_1.jsx)("div", { className: "suggestion-title", children: "Adam's Suggestion:" }), (0, jsx_runtime_1.jsx)("div", { className: "suggestion-text", children: suggestion || "No recommendation available at the moment." })] })] }) }));
}
//# sourceMappingURL=suggestion-section.js.map