"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingsPlansTab = SavingsPlansTab;
const jsx_runtime_1 = require("react/jsx-runtime");
const savings_table_1 = require("../savings-table");
function SavingsPlansTab({ isActive, savingsPlans, selectedResource, setSelectedResource, }) {
    if (!isActive)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "tab-panel active", children: [(0, jsx_runtime_1.jsxs)("div", { className: "pricing-header", children: [(0, jsx_runtime_1.jsx)("h3", { className: "pricing-option-name", children: "Savings Plans & Reserved Instances" }), (0, jsx_runtime_1.jsx)("p", { className: "pricing-option-description", children: "Commit to 1 or 3 years for significant discounts. Best for stable, predictable workloads." })] }), (0, jsx_runtime_1.jsx)("div", { className: "toggle-container", children: (0, jsx_runtime_1.jsx)("div", { className: "provider-section", children: savingsPlans.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "no-resources", children: "No savings plans available for this configuration" })) : ((0, jsx_runtime_1.jsx)(savings_table_1.SavingsTable, { savingsPlans: savingsPlans, selectedResource: selectedResource, setSelectedResource: setSelectedResource })) }) })] }));
}
//# sourceMappingURL=savings-plans-tab.js.map