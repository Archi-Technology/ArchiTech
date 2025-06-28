"use client";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import PricePropositionCard from "../price-proposition-card";
export function ProviderResourceGrid({ serviceName, provider, resources, selectedResource, setSelectedResource, pricingType, }) {
    if (resources.length === 0) {
        return _jsxs("div", { className: "no-resources", children: ["No ", provider, " resources available for this configuration"] });
    }
    return (_jsx("div", { className: "resource-grid", children: resources.map((resource) => (_jsx(PricePropositionCard, { serviceName: serviceName, resource: resource, isSelected: selectedResource === resource.id, onSelect: (id) => setSelectedResource(id), pricingType: pricingType }, resource.id))) }));
}
//# sourceMappingURL=provider-resource-grid.js.map