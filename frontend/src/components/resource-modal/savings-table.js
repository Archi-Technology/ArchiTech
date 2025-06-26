"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingsTable = SavingsTable;
const jsx_runtime_1 = require("react/jsx-runtime");
const awsIcon_png_1 = __importDefault(require("../../assets/awsIcon.png"));
const azureIcon_png_1 = __importDefault(require("../../assets/azureIcon.png"));
function SavingsTable({ savingsPlans, selectedResource, setSelectedResource, }) {
    // Group savings plans by term
    const oneYearPlans = savingsPlans.filter((resource) => resource.reservationTerm === "1 Year");
    const threeYearPlans = savingsPlans.filter((resource) => resource.reservationTerm === "3 Years");
    return ((0, jsx_runtime_1.jsxs)("table", { className: "savings-table", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Term" }), (0, jsx_runtime_1.jsx)("th", { children: "Provider" }), (0, jsx_runtime_1.jsx)("th", { children: "Price Per Hour" }), (0, jsx_runtime_1.jsx)("th", { children: "Select" })] }) }), (0, jsx_runtime_1.jsxs)("tbody", { children: [oneYearPlans.map((resource) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: "1 Year" }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("img", { src: resource.provider === "AWS" ? awsIcon_png_1.default : azureIcon_png_1.default, alt: resource.provider, className: "provider-icon" }) }), (0, jsx_runtime_1.jsxs)("td", { children: ["$", resource.pricePerHour?.toFixed(4) || "N/A"] }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("input", { type: "radio", name: "savings-plan", checked: selectedResource === resource.id, onChange: () => setSelectedResource(resource.id) }) })] }, resource.id))), threeYearPlans.map((resource) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: "3 Years" }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("img", { src: resource.provider === "AWS" ? awsIcon_png_1.default : azureIcon_png_1.default, alt: resource.provider, className: "provider-icon" }) }), (0, jsx_runtime_1.jsxs)("td", { children: ["$", resource.pricePerHour?.toFixed(4) || "N/A"] }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("input", { type: "radio", name: "savings-plan", checked: selectedResource === resource.id, onChange: () => setSelectedResource(resource.id) }) })] }, resource.id)))] })] }));
}
//# sourceMappingURL=savings-table.js.map