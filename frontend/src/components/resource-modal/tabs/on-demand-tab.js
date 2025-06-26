"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnDemandTab = OnDemandTab;
const jsx_runtime_1 = require("react/jsx-runtime");
const provider_resource_grid_1 = require("../provider-resource-grid");
function OnDemandTab({ serviceName, isActive, resources, selectedResource, setSelectedResource, }) {
    if (!isActive)
        return null;
    const awsResources = resources.filter((r) => r.provider === "AWS");
    const azureResources = resources.filter((r) => r.provider === "azure");
    return ((0, jsx_runtime_1.jsxs)("div", { className: "tab-panel active", children: [(0, jsx_runtime_1.jsxs)("div", { className: "pricing-header", children: [(0, jsx_runtime_1.jsx)("h3", { className: "pricing-option-name", children: "On-Demand Pricing" }), (0, jsx_runtime_1.jsx)("p", { className: "pricing-option-description", children: "Pay as you go with no commitment. Standard pricing with maximum flexibility." })] }), (0, jsx_runtime_1.jsx)("div", { className: "toggle-container", children: (0, jsx_runtime_1.jsxs)("div", { className: "provider-section", children: [(0, jsx_runtime_1.jsx)(provider_resource_grid_1.ProviderResourceGrid, { serviceName: serviceName, provider: "AWS", resources: awsResources, selectedResource: selectedResource, setSelectedResource: setSelectedResource, pricingType: "on-demand" }), (0, jsx_runtime_1.jsx)(provider_resource_grid_1.ProviderResourceGrid, { serviceName: serviceName, provider: "Azure", resources: azureResources, selectedResource: selectedResource, setSelectedResource: setSelectedResource, pricingType: "on-demand" })] }) })] }));
}
//# sourceMappingURL=on-demand-tab.js.map