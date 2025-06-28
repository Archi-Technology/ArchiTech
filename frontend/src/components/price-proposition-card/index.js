'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import awsIcon from '../../assets/awsIcon.png';
import azureIcon from '../../assets/azureIcon.png';
import './index.scss';
export default function PricePropositionCard({ serviceName, resource, isSelected, onSelect, pricingType = 'on-demand', }) {
    const getProviderIcon = () => {
        if (resource.provider === 'AWS') {
            return awsIcon || '/placeholder.svg?height=24&width=32';
        }
        return azureIcon || '/placeholder.svg?height=24&width=24';
    };
    const formatPrice = (price) => {
        if (!price)
            return 'Contact for pricing';
        if (serviceName === 'Object Storage') {
            return `$${price.toFixed(4)}/Month`;
        }
        return `$${price.toFixed(4)}/Hour`;
    };
    return (_jsxs("div", { className: `price-proposition-card ${isSelected ? 'selected' : ''}`, onClick: () => onSelect(resource.id), children: [_jsxs("div", { className: "card-header", children: [_jsx("div", { className: "provider-info", children: _jsx("img", { src: getProviderIcon() || '/placeholder.svg', alt: `${resource.provider} logo`, className: "provider-logo" }) }), _jsx("div", { className: "selection-indicator", children: _jsx("div", { className: "radio-button", children: _jsx("div", { className: "radio-inner" }) }) })] }), _jsxs("div", { className: "card-content", children: [_jsxs("div", { className: "instance-info", children: [_jsx("h4", { className: "instance-name", children: resource.productName ||
                                    resource.instanceType ||
                                    resource.lbType ||
                                    resource.storageTier }), resource.instanceType && resource.productName && (_jsxs("p", { className: "instance-type", children: ["Type: ", resource.instanceType] })), resource.os && _jsxs("p", { className: "instance-os", children: ["OS: ", resource.os] }), resource.region && (_jsxs("p", { className: "instance-region", children: ["Region: ", resource.region] }))] }), _jsx("div", { className: "pricing-info", children: _jsx("div", { className: "price-display", children: _jsx("span", { className: "price-amount", children: formatPrice(resource.pricePerHour ?? resource.pricePerGbPerMonth) }) }) })] })] }));
}
//# sourceMappingURL=index.js.map