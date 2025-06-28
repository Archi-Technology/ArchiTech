// utils/redundencyMapper.ts
const storageClassRedundancyMap = [
    {
        name: 'Standard',
        azure: ['LRS'],
    },
    {
        name: 'Infrequent Access',
        azure: ['GRS'],
    },
    {
        name: 'Archive',
        azure: ['GRS'],
    },
    {
        name: 'Deep Archive',
        azure: ['GZRS'],
    },
];
export function getAllAvailableObjectStorageClasses() {
    return storageClassRedundancyMap.map((entry) => entry.name);
}
export function translateStorageClassToCloudRedundancy(storageClassName, provider) {
    const entry = storageClassRedundancyMap.find((s) => s.name === storageClassName);
    if (!entry)
        return [];
    // Only translating for Azure, AWS doesn't use these types
    return provider === 'azure' ? entry.azure : [];
}
//# sourceMappingURL=redundencyMapper.js.map