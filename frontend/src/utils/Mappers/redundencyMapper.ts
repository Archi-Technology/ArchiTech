// utils/redundencyMapper.ts

type CloudProvider = 'aws' | 'azure';

interface StorageClassRedundancyMapEntry {
  name: string;
  azure: string[]; // Azure redundancy types
}

const storageClassRedundancyMap: StorageClassRedundancyMapEntry[] = [
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
  return provider === 'azure' ? entry.azure : [];
}
