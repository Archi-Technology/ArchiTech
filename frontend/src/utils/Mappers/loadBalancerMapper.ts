// utils/loadBalancerMapper.ts

type CloudProvider = 'aws' | 'azure';

interface LoadBalancerTypeMapEntry {
  name: string;
  aws: string[];
  azure: string[]; 
}

const loadBalancerTypeMap: LoadBalancerTypeMapEntry[] = [
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

export function getAllAvailableLoadBalancerTypes(): string[] {
  return loadBalancerTypeMap.map((entry) => entry.name);
}

export function translateLoadBalancerTypeToCloudOptions(
  typeName: string,
  provider: CloudProvider,
): string[] {
  const entry = loadBalancerTypeMap.find((t) => t.name === typeName);
  if (!entry) return [];
  return provider === 'aws' ? entry.aws : entry.azure;
}
