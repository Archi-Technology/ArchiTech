"use client";
import { jsx as _jsx } from "react/jsx-runtime";
export function TabList({ pricingOptions, activePricingOption, onTabChange, }) {
    return (_jsx("div", { className: "tabs-list", children: pricingOptions.map((option) => (_jsx("button", { className: `tab-button ${activePricingOption === option.id ? "active" : ""}`, onClick: () => onTabChange(option.id), children: option.name }, option.id))) }));
}
//# sourceMappingURL=tab-list.js.map