export type Cloud = 'aws' | 'azure';

type InstanceMap = Record<string, { aws?: string[]; azure?: string[] }>;

const instanceMap: InstanceMap = {
  'General Purpose': {
    aws: [
      't3.nano',
      't3.micro',
      't3.small',
      't3.medium',
      'm5.large',
      'm5.xlarge',
    ],
    azure: [
      'Standard_B1s',
      'Standard_B2s',
      'Standard_D2s_v3',
      'Standard_D4s_v3',
    ],
  },
  'Compute Optimized': {
    aws: ['c5.large', 'c5.xlarge', 'c6g.large', 'c6g.xlarge'],
    azure: ['Standard_F2s_v2', 'Standard_F4s_v2'],
  },
  'Memory Optimized': {
    aws: ['r5.large', 'r5.xlarge', 'r6g.large'],
    azure: ['Standard_E2s_v3', 'Standard_E4s_v3'],
  },
  'Storage Optimized': {
    aws: ['i3.large', 'i3.xlarge', 'd2.xlarge'],
    azure: ['Standard_L4s', 'Standard_L8s'],
  },
  'GPU Instances': {
    aws: ['g4dn.xlarge', 'p3.2xlarge'],
    azure: ['Standard_NC6', 'Standard_NV6'],
  },
  'High Performance Computing': {
    aws: ['hpc6id.32xlarge', 'c5n.18xlarge'],
    azure: ['Standard_H16r', 'Standard_HB120rs_v3'],
  },
};

export function translateInstanceTypeCategory(
  category: string,
  cloud: Cloud,
): string[] {
  const entry = Object.entries(instanceMap).find(
    ([key]) => key.toLowerCase() === category.toLowerCase(),
  );
  return entry?.[1]?.[cloud] ?? [];
}

export function getAllAvailableInstanceCategories(): string[] {
  return Object.keys(instanceMap).sort((a, b) => a.localeCompare(b));
}
