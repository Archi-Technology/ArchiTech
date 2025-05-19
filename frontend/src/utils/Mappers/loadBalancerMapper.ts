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
    azure: ['Application Gateway'],
  },
  {
    name: 'Network',
    aws: ['network'],
    azure: ['Load Balancer'],
  },
  {
    name: 'Gateway',
    aws: [],
    azure: ['Gateway Load Balancer'],
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
