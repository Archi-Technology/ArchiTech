"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import awsIcon from "../../assets/awsIcon.png";
import azureIcon from "../../assets/azureIcon.png";
export function SavingsTable({ savingsPlans, selectedResource, setSelectedResource, }) {
    // Group savings plans by term
    const oneYearPlans = savingsPlans.filter((resource) => resource.reservationTerm === "1 Year");
    const threeYearPlans = savingsPlans.filter((resource) => resource.reservationTerm === "3 Years");
    return (_jsxs("table", { className: "savings-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Term" }), _jsx("th", { children: "Provider" }), _jsx("th", { children: "Price Per Hour" }), _jsx("th", { children: "Select" })] }) }), _jsxs("tbody", { children: [oneYearPlans.map((resource) => (_jsxs("tr", { children: [_jsx("td", { children: "1 Year" }), _jsx("td", { children: _jsx("img", { src: resource.provider === "AWS" ? awsIcon : azureIcon, alt: resource.provider, className: "provider-icon" }) }), _jsxs("td", { children: ["$", resource.pricePerHour?.toFixed(4) || "N/A"] }), _jsx("td", { children: _jsx("input", { type: "radio", name: "savings-plan", checked: selectedResource === resource.id, onChange: () => setSelectedResource(resource.id) }) })] }, resource.id))), threeYearPlans.map((resource) => (_jsxs("tr", { children: [_jsx("td", { children: "3 Years" }), _jsx("td", { children: _jsx("img", { src: resource.provider === "AWS" ? awsIcon : azureIcon, alt: resource.provider, className: "provider-icon" }) }), _jsxs("td", { children: ["$", resource.pricePerHour?.toFixed(4) || "N/A"] }), _jsx("td", { children: _jsx("input", { type: "radio", name: "savings-plan", checked: selectedResource === resource.id, onChange: () => setSelectedResource(resource.id) }) })] }, resource.id)))] })] }));
}
//# sourceMappingURL=savings-table.js.map