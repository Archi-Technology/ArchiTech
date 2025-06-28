import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SavingsTable } from "../savings-table";
export function SavingsPlansTab({ isActive, savingsPlans, selectedResource, setSelectedResource, }) {
    if (!isActive)
        return null;
    return (_jsxs("div", { className: "tab-panel active", children: [_jsxs("div", { className: "pricing-header", children: [_jsx("h3", { className: "pricing-option-name", children: "Savings Plans & Reserved Instances" }), _jsx("p", { className: "pricing-option-description", children: "Commit to 1 or 3 years for significant discounts. Best for stable, predictable workloads." })] }), _jsx("div", { className: "toggle-container", children: _jsx("div", { className: "provider-section", children: savingsPlans.length === 0 ? (_jsx("div", { className: "no-resources", children: "No savings plans available for this configuration" })) : (_jsx(SavingsTable, { savingsPlans: savingsPlans, selectedResource: selectedResource, setSelectedResource: setSelectedResource })) }) })] }));
}
//# sourceMappingURL=savings-plans-tab.js.map