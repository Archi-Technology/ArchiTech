const instanceMap = {
    'General Purpose': {
        aws: [
            'db.t3.nano',
            'db.t3.micro',
            'db.t3.small',
            'db.t3.medium',
            'db.m5.large',
            'db.m5.xlarge',
        ],
        azure: ['5 vCore', '10 vCore', '16 vCore', '20 vCore'],
    },
    'Compute Optimized': {
        aws: [
            'db.m6g.large',
            'db.m6g.xlarge',
            'db.m6g.2xlarge',
            'db.t4g.xlarge',
            'db.r6g.large',
        ],
        azure: ['16 vCore', '32 vCore', '64 vCore'],
    },
    'Memory Optimized': {
        aws: ['db.r5.large', 'db.r5.xlarge', 'db.r6g.large'],
        azure: ['32 vCore', '64 vCore', '80 vCore'],
    },
    'Storage Optimized': {
        aws: ['db.i3.large', 'db.i3.xlarge', 'db.d2.xlarge'],
        azure: ['2500 DTU Pack', 'PRS6 Secondary Active'],
    },
    'GPU Instances': {
        aws: ['db.g4dn.xlarge', 'db.p3.2xlarge'],
        azure: ['Standard_NV6'],
    },
    'High Performance Computing': {
        aws: ['db.hpc6id.32xlarge', 'db.c5n.18xlarge'],
        azure: ['128 vCore', '96 vCore'],
    },
};
export function translateInstanceTypeCategory(category, cloud) {
    const entry = instanceMap[category];
    if (!entry)
        return [];
    return entry[cloud] ?? [];
}
export function getAllAvailableInstanceCategories() {
    return Object.keys(instanceMap).sort((a, b) => a.localeCompare(b));
}
const dbInstanceTypeMap = [
    {
        name: 'General Purpose',
        aws: ['db.t3', 'db.t4g', 'db.m6g', 'db.m5'],
        azure: ['GP_Gen5', 'DC_Gen5'],
    },
    {
        name: 'Memory Optimized',
        aws: ['db.r5', 'db.r6g', 'db.x2g'],
        azure: ['MO_Gen5', 'BusinessCritical_M'],
    },
    {
        name: 'Burstable',
        aws: ['db.t2', 'db.t3', 'db.t4g'],
        azure: ['Burstable_B'],
    },
    {
        name: 'Compute Optimized',
        aws: ['db.c5', 'db.c6g'],
        azure: ['Hyperscale', 'ComputeOptimized_F'],
    },
];
export function getAllAvailableDBInstanceTypes() {
    return dbInstanceTypeMap.map((entry) => entry.name);
}
export function translateDBInstanceTypeToCloudOptions(typeName, provider) {
    const entry = dbInstanceTypeMap.find((e) => e.name === typeName);
    if (!entry)
        return [];
    return provider === 'aws' ? entry.aws : entry.azure;
}
//# sourceMappingURL=dbInstanceTypeMapper.js.map