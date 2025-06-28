import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaRobot } from "react-icons/fa";
export function SuggestionSection({ suggestion }) {
    return (_jsx("div", { className: "suggestion-section", children: _jsxs("div", { className: "suggestion-container", children: [_jsx("div", { className: "bot-icon-container", children: _jsx(FaRobot, { className: "bot-icon" }) }), _jsxs("div", { className: "suggestion-content", children: [_jsx("div", { className: "suggestion-title", children: "Adam's Suggestion:" }), _jsx("div", { className: "suggestion-text", children: suggestion || "No recommendation available at the moment." })] })] }) }));
}
//# sourceMappingURL=suggestion-section.js.map