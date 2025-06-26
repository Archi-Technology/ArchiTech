"use strict";
// utils/loadBalancerMapper.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAvailableLoadBalancerTypes = getAllAvailableLoadBalancerTypes;
exports.translateLoadBalancerTypeToCloudOptions = translateLoadBalancerTypeToCloudOptions;
const loadBalancerTypeMap = [
    {
        name: 'Application',
        aws: ['application'],
        azure: [],
    },
    {
        name: 'Network',
        aws: ['network'],
        azure: ['Standard'],
    },
    {
        name: 'Gateway',
        aws: [],
        azure: ['Gateway'],
    },
];
function getAllAvailableLoadBalancerTypes() {
    return loadBalancerTypeMap.map((entry) => entry.name);
}
function translateLoadBalancerTypeToCloudOptions(typeName, provider) {
    const entry = loadBalancerTypeMap.find((t) => t.name === typeName);
    if (!entry)
        return [];
    return provider === 'aws' ? entry.aws : entry.azure;
}
//# sourceMappingURL=loadBalancerMapper.js.map