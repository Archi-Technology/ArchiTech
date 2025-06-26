"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResourceCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const awsIcon_png_1 = __importDefault(require("../../assets/awsIcon.png"));
const azureIcon_png_1 = __importDefault(require("../../assets/azureIcon.png"));
function ResourceCard({ resource, isSelected, onSelect, }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: `resource-option ${isSelected ? 'selected' : ''}`, onClick: () => onSelect(resource.id), children: (0, jsx_runtime_1.jsxs)("div", { className: "resource-option-content", children: [(0, jsx_runtime_1.jsx)("div", { className: "radio-container", children: (0, jsx_runtime_1.jsx)("div", { className: "radio-outer", children: (0, jsx_runtime_1.jsx)("div", { className: `radio-inner ${isSelected ? 'checked' : ''}` }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "resource-details", children: [(0, jsx_runtime_1.jsx)("div", { className: "resource-name", children: resource.productName ?? 'Unnamed Resource' }), (0, jsx_runtime_1.jsxs)("div", { className: "resource-meta", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Instance Type:" }), " ", resource.instanceType ?? 'N/A'] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "OS:" }), " ", resource.os ?? 'N/A'] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Region:" }), " ", resource.region ?? 'N/A'] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Price per Hour:" }), " $", resource.pricePerHour?.toFixed(4) ?? 'N/A'] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "provider-icon-container", children: [resource.provider === 'AWS' && ((0, jsx_runtime_1.jsx)("img", { src: awsIcon_png_1.default, alt: "AWS Icon", className: "provider-icon aws", style: { width: '36px', height: '24px' } })), resource.provider === 'azure' && ((0, jsx_runtime_1.jsx)("img", { src: azureIcon_png_1.default, alt: "Azure Icon", className: "provider-icon azure", style: { width: '24px', height: '24px' } }))] })] }) }));
}
//# sourceMappingURL=index.js.map