// utils/redundencyMapper.ts

type CloudProvider = 'aws' | 'azure';

interface StorageClassRedundancyMapEntry {
  name: string;
  azureRedundancy: string[]; // Azure redundancy types
}

const storageClassRedundancyMap: StorageClassRedundancyMapEntry[] = [
  {
    name: 'Standard',
    azureRedundancy: ['LRS'],
  },
  {
    name: 'Infrequent Access',
    azureRedundancy: ['GRS'],
  },
  {
    name: 'Archive',
    azureRedundancy: ['GRS'],
  },
  {
    name: 'Deep Archive',
    azureRedundancy: ['GZRS'],
  },
];

export function getAllAvailableObjectStorageClasses(): string[] {
  return storageClassRedundancyMap.map((entry) => entry.name);
}

export function translateStorageClassToCloudRedundancy(
  storageClassName: string,
  provider: CloudProvider
): string[] {
  const entry = storageClassRedundancyMap.find((s) => s.name === storageClassName);
  if (!entry) return [];

  // Only translating for Azure, AWS doesn't use these types
  return provider === 'azure' ? entry.azureRedundancy : [];
}
