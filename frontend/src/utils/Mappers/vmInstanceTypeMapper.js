const instanceMap = {
    'General Purpose': {
        aws: ['m5a.12xlarge', 'm6i.xlarge', 'm6in.12xlarge', 'm7a.8xlarge'],
        azure: [
            'Standard_D2s_v3',
            'Standard_D4as_v4',
            'Standard_D8ds_v4',
            'Standard_D16as_v5',
        ],
    },
    'Compute Optimized': {
        aws: ['c5.xlarge', 'c6i.12xlarge', 'c7a.48xlarge', 'c8g.2xlarge'],
        azure: [
            'Standard_F2s_v2',
            'Standard_F4s_v2',
            'Standard_F8s_v2',
            'Standard_F16s_v2',
        ],
    },
    'Memory Optimized': {
        aws: ['r5.2xlarge', 'r6id.24xlarge', 'r7a.16xlarge', 'r7g.2xlarge'],
        azure: [
            'Standard_E2s_v3',
            'Standard_E8as_v4',
            'Standard_E16ds_v4',
            'Standard_E64-16ds_v4',
        ],
    },
    'Storage Optimized': {
        aws: ['i3.4xlarge', 'i4i.32xlarge', 'd3.8xlarge', 'h1.4xlarge'],
        azure: [
            'Standard_L4s',
            'Standard_L8s_v2',
            'Standard_L16s_v3',
            'Standard_L32s_v2',
        ],
    },
    'GPU Instances': {
        aws: ['g3.16xlarge', 'g4ad.16xlarge', 'g5.4xlarge', 'p5.48xlarge'],
        azure: ['Standard_NC6', 'Standard_NC12', 'Standard_ND6s', 'Standard_NV6'],
    },
    'High Performance Computing': {
        aws: [
            'u-6tb1.56xlarge',
            'u7in-32tb.224xlarge',
            'x8g.48xlarge',
            'z1d.large',
        ],
        azure: [
            'Standard_HB120-16rs_v3',
            'Standard_HC44rs',
            'Standard_HB60rs',
            'Standard_H16mr',
        ],
    },
};
export function translateVMInstanceTypeCategory(category, cloud) {
    const entry = instanceMap[category];
    if (!entry)
        return [];
    return entry[cloud] ?? [];
}
export function getAllAvailableVMInstanceCategories() {
    return Object.keys(instanceMap).sort((a, b) => a.localeCompare(b));
}
//# sourceMappingURL=vmInstanceTypeMapper.js.map