import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProviderResourceGrid } from "../provider-resource-grid";
export function SpotInstancesTab({ isActive, spotInstances, selectedResource, setSelectedResource, }) {
    if (!isActive)
        return null;
    const awsSpotInstances = spotInstances.filter((r) => r.provider === "AWS");
    const azureSpotInstances = spotInstances.filter((r) => r.provider === "azure");
    return (_jsxs("div", { className: "tab-panel active", children: [_jsxs("div", { className: "pricing-header", children: [_jsx("h3", { className: "pricing-option-name", children: "Spot Instances" }), _jsx("p", { className: "pricing-option-description", children: "Up to 90% off on-demand pricing with variable availability. Best for fault-tolerant workloads." })] }), _jsx("div", { className: "toggle-container", children: _jsxs("div", { className: "provider-section", children: [_jsx(ProviderResourceGrid, { provider: "AWS", resources: awsSpotInstances, selectedResource: selectedResource, setSelectedResource: setSelectedResource, pricingType: "spot" }), _jsx(ProviderResourceGrid, { provider: "Azure", resources: azureSpotInstances, selectedResource: selectedResource, setSelectedResource: setSelectedResource, pricingType: "spot" })] }) })] }));
}
//# sourceMappingURL=spot-instances-tab.js.map