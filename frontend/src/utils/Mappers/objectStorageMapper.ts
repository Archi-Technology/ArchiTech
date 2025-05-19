// utils/objectStorageMapper.ts

type CloudProvider = 'aws' | 'azure';

interface StorageClassMapEntry {
  name: string;
  aws: string[]; // AWS storage class identifiers
  azure: string[]; // Azure access tier identifiers
}

const storageClassMap: StorageClassMapEntry[] = [
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

export function getAllAvailableObjectStorageClasses(): string[] {
  return storageClassMap.map((entry) => entry.name);
}

export function translateStorageClassToCloudOptions(
  storageClassName: string,
  provider: CloudProvider,
): string[] {
  const entry = storageClassMap.find((s) => s.name === storageClassName);
  if (!entry) return [];

  return provider === 'aws' ? entry.aws : entry.azure;
}
