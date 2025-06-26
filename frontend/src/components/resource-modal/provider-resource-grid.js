"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderResourceGrid = ProviderResourceGrid;
const jsx_runtime_1 = require("react/jsx-runtime");
const price_proposition_card_1 = __importDefault(require("../price-proposition-card"));
function ProviderResourceGrid({ serviceName, provider, resources, selectedResource, setSelectedResource, pricingType, }) {
    if (resources.length === 0) {
        return (0, jsx_runtime_1.jsxs)("div", { className: "no-resources", children: ["No ", provider, " resources available for this configuration"] });
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "resource-grid", children: resources.map((resource) => ((0, jsx_runtime_1.jsx)(price_proposition_card_1.default, { serviceName: serviceName, resource: resource, isSelected: selectedResource === resource.id, onSelect: (id) => setSelectedResource(id), pricingType: pricingType }, resource.id))) }));
}
//# sourceMappingURL=provider-resource-grid.js.map