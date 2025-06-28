import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProviderResourceGrid } from "../provider-resource-grid";
export function OnDemandTab({ serviceName, isActive, resources, selectedResource, setSelectedResource, }) {
    if (!isActive)
        return null;
    const awsResources = resources.filter((r) => r.provider === "AWS");
    const azureResources = resources.filter((r) => r.provider === "azure");
    return (_jsxs("div", { className: "tab-panel active", children: [_jsxs("div", { className: "pricing-header", children: [_jsx("h3", { className: "pricing-option-name", children: "On-Demand Pricing" }), _jsx("p", { className: "pricing-option-description", children: "Pay as you go with no commitment. Standard pricing with maximum flexibility." })] }), _jsx("div", { className: "toggle-container", children: _jsxs("div", { className: "provider-section", children: [_jsx(ProviderResourceGrid, { serviceName: serviceName, provider: "AWS", resources: awsResources, selectedResource: selectedResource, setSelectedResource: setSelectedResource, pricingType: "on-demand" }), _jsx(ProviderResourceGrid, { serviceName: serviceName, provider: "Azure", resources: azureResources, selectedResource: selectedResource, setSelectedResource: setSelectedResource, pricingType: "on-demand" })] }) })] }));
}
//# sourceMappingURL=on-demand-tab.js.map