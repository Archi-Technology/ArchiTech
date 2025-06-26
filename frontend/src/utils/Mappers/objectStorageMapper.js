"use strict";
// utils/objectStorageMapper.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAvailableObjectStorageClasses = getAllAvailableObjectStorageClasses;
exports.translateStorageClassToCloudOptions = translateStorageClassToCloudOptions;
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
function getAllAvailableObjectStorageClasses() {
    return storageClassMap.map((entry) => entry.name);
}
function translateStorageClassToCloudOptions(storageClassName, provider) {
    const entry = storageClassMap.find((s) => s.name === storageClassName);
    if (!entry)
        return [];
    return provider === 'aws' ? entry.aws : entry.azure;
}
//# sourceMappingURL=objectStorageMapper.js.map