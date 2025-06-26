"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceTabs = ResourceTabs;
const jsx_runtime_1 = require("react/jsx-runtime");
const tab_list_1 = require("./tab-list");
const on_demand_tab_1 = require("./tabs/on-demand-tab");
const spot_instances_tab_1 = require("./tabs/spot-instances-tab");
const savings_plans_tab_1 = require("./tabs/savings-plans-tab");
function ResourceTabs({ pricingOption, setPricingOption, resources, spotInstances, savingsPlans, selectedResource, setSelectedResource, isVirtualMachine, }) {
    // Define pricing options
    const pricingOptions = [
        {
            id: "on-demand",
            name: "On-Demand",
            description: "Pay as you go with no commitment",
            discount: "0%",
        },
        {
            id: "spot",
            name: "Spot Instances",
            description: "Up to 90% off on-demand pricing with variable availability",
            discount: "Up to 90%",
        },
        {
            id: "savings",
            name: "Savings Plans",
            description: "Commit to 1 or 3 years for significant discounts",
            discount: "Up to 72%",
        },
    ];
    // Filter options based on resource type
    const availablePricingOptions = isVirtualMachine
        ? pricingOptions
        : pricingOptions.filter((option) => option.id === "on-demand");
    return ((0, jsx_runtime_1.jsx)("div", { className: "pricing-section", children: (0, jsx_runtime_1.jsxs)("div", { className: "tabs-container", children: [(0, jsx_runtime_1.jsx)(tab_list_1.TabList, { pricingOptions: availablePricingOptions, activePricingOption: pricingOption, onTabChange: setPricingOption }), (0, jsx_runtime_1.jsx)(on_demand_tab_1.OnDemandTab, { isActive: pricingOption === "on-demand", resources: resources, selectedResource: selectedResource, setSelectedResource: setSelectedResource }), isVirtualMachine && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(spot_instances_tab_1.SpotInstancesTab, { isActive: pricingOption === "spot", spotInstances: spotInstances, selectedResource: selectedResource, setSelectedResource: setSelectedResource }), (0, jsx_runtime_1.jsx)(savings_plans_tab_1.SavingsPlansTab, { isActive: pricingOption === "savings", savingsPlans: savingsPlans, selectedResource: selectedResource, setSelectedResource: setSelectedResource })] }))] }) }));
}
//# sourceMappingURL=resource-tabs.js.map