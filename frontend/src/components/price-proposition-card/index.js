'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PricePropositionCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const awsIcon_png_1 = __importDefault(require("../../assets/awsIcon.png"));
const azureIcon_png_1 = __importDefault(require("../../assets/azureIcon.png"));
require("./index.scss");
function PricePropositionCard({ serviceName, resource, isSelected, onSelect, pricingType = 'on-demand', }) {
    const getProviderIcon = () => {
        if (resource.provider === 'AWS') {
            return awsIcon_png_1.default || '/placeholder.svg?height=24&width=32';
        }
        return azureIcon_png_1.default || '/placeholder.svg?height=24&width=24';
    };
    const formatPrice = (price) => {
        if (!price)
            return 'Contact for pricing';
        if (serviceName === 'Object Storage') {
            return `$${price.toFixed(4)}/Month`;
        }
        return `$${price.toFixed(4)}/Hour`;
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: `price-proposition-card ${isSelected ? 'selected' : ''}`, onClick: () => onSelect(resource.id), children: [(0, jsx_runtime_1.jsxs)("div", { className: "card-header", children: [(0, jsx_runtime_1.jsx)("div", { className: "provider-info", children: (0, jsx_runtime_1.jsx)("img", { src: getProviderIcon() || '/placeholder.svg', alt: `${resource.provider} logo`, className: "provider-logo" }) }), (0, jsx_runtime_1.jsx)("div", { className: "selection-indicator", children: (0, jsx_runtime_1.jsx)("div", { className: "radio-button", children: (0, jsx_runtime_1.jsx)("div", { className: "radio-inner" }) }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "card-content", children: [(0, jsx_runtime_1.jsxs)("div", { className: "instance-info", children: [(0, jsx_runtime_1.jsx)("h4", { className: "instance-name", children: resource.productName ||
                                    resource.instanceType ||
                                    resource.lbType ||
                                    resource.storageTier }), resource.instanceType && resource.productName && ((0, jsx_runtime_1.jsxs)("p", { className: "instance-type", children: ["Type: ", resource.instanceType] })), resource.os && (0, jsx_runtime_1.jsxs)("p", { className: "instance-os", children: ["OS: ", resource.os] }), resource.region && ((0, jsx_runtime_1.jsxs)("p", { className: "instance-region", children: ["Region: ", resource.region] }))] }), (0, jsx_runtime_1.jsx)("div", { className: "pricing-info", children: (0, jsx_runtime_1.jsx)("div", { className: "price-display", children: (0, jsx_runtime_1.jsx)("span", { className: "price-amount", children: formatPrice(resource.pricePerHour ?? resource.pricePerGbPerMonth) }) }) })] })] }));
}
//# sourceMappingURL=index.js.map