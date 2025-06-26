"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabList = TabList;
const jsx_runtime_1 = require("react/jsx-runtime");
function TabList({ pricingOptions, activePricingOption, onTabChange, }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "tabs-list", children: pricingOptions.map((option) => ((0, jsx_runtime_1.jsx)("button", { className: `tab-button ${activePricingOption === option.id ? "active" : ""}`, onClick: () => onTabChange(option.id), children: option.name }, option.id))) }));
}
//# sourceMappingURL=tab-list.js.map