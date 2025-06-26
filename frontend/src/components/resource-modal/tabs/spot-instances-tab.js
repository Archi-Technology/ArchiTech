"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotInstancesTab = SpotInstancesTab;
const jsx_runtime_1 = require("react/jsx-runtime");
const provider_resource_grid_1 = require("../provider-resource-grid");
function SpotInstancesTab({ isActive, spotInstances, selectedResource, setSelectedResource, }) {
    if (!isActive)
        return null;
    const awsSpotInstances = spotInstances.filter((r) => r.provider === "AWS");
    const azureSpotInstances = spotInstances.filter((r) => r.provider === "azure");
    return ((0, jsx_runtime_1.jsxs)("div", { className: "tab-panel active", children: [(0, jsx_runtime_1.jsxs)("div", { className: "pricing-header", children: [(0, jsx_runtime_1.jsx)("h3", { className: "pricing-option-name", children: "Spot Instances" }), (0, jsx_runtime_1.jsx)("p", { className: "pricing-option-description", children: "Up to 90% off on-demand pricing with variable availability. Best for fault-tolerant workloads." })] }), (0, jsx_runtime_1.jsx)("div", { className: "toggle-container", children: (0, jsx_runtime_1.jsxs)("div", { className: "provider-section", children: [(0, jsx_runtime_1.jsx)(provider_resource_grid_1.ProviderResourceGrid, { provider: "AWS", resources: awsSpotInstances, selectedResource: selectedResource, setSelectedResource: setSelectedResource, pricingType: "spot" }), (0, jsx_runtime_1.jsx)(provider_resource_grid_1.ProviderResourceGrid, { provider: "Azure", resources: azureSpotInstances, selectedResource: selectedResource, setSelectedResource: setSelectedResource, pricingType: "spot" })] }) })] }));
}
//# sourceMappingURL=spot-instances-tab.js.map