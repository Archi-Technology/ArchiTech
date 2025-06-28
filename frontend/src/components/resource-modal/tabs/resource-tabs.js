import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { TabList } from "../tab-list";
import { OnDemandTab } from "./on-demand-tab";
import { SpotInstancesTab } from "./spot-instances-tab";
import { SavingsPlansTab } from "./savings-plans-tab";
export function ResourceTabs({ serviceName, pricingOption, setPricingOption, resources, spotInstances, savingsPlans, selectedResource, setSelectedResource, isVirtualMachine, }) {
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
    return (_jsx("div", { className: "pricing-section", children: _jsxs("div", { className: "tabs-container", children: [_jsx(TabList, { pricingOptions: availablePricingOptions, activePricingOption: pricingOption, onTabChange: setPricingOption }), _jsx(OnDemandTab, { serviceName: serviceName, isActive: pricingOption === "on-demand", resources: resources, selectedResource: selectedResource, setSelectedResource: setSelectedResource }), isVirtualMachine && (_jsxs(_Fragment, { children: [_jsx(SpotInstancesTab, { isActive: pricingOption === "spot", spotInstances: spotInstances, selectedResource: selectedResource, setSelectedResource: setSelectedResource }), _jsx(SavingsPlansTab, { isActive: pricingOption === "savings", savingsPlans: savingsPlans, selectedResource: selectedResource, setSelectedResource: setSelectedResource })] }))] }) }));
}
//# sourceMappingURL=resource-tabs.js.map