// utils/objectStorageMapper.ts
const storageClassMap = [
    {
        name: 'Standard',
        aws: ['STANDARD'],
        azure: ['Hot'],
    },
    {
        name: 'Infrequent Access',
        aws: ['STANDARD_IA', 'ONEZONE_IA'],
        azure: ['Cool'],
    },
    {
        name: 'Archive',
        aws: ['GLACIER', 'GLACIER_IR'],
        azure: ['Archive'],
    },
    {
        name: 'Deep Archive',
        aws: ['DEEP_ARCHIVE'],
        azure: ['Archive'],
    },
];
export function getAllAvailableObjectStorageClasses() {
    return storageClassMap.map((entry) => entry.name);
}
export function translateStorageClassToCloudOptions(storageClassName, provider) {
    const entry = storageClassMap.find((s) => s.name === storageClassName);
    if (!entry)
        return [];
    return provider === 'aws' ? entry.aws : entry.azure;
}
//# sourceMappingURL=objectStorageMapper.js.map