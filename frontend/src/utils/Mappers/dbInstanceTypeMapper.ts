// utils/dbInstanceTypeMapper.ts

type CloudProvider = 'aws' | 'azure';

interface DBInstanceTypeMapEntry {
  name: string; // Unified DB instance type name (for UI)
  aws: string[]; // AWS DB instance families
  azure: string[]; // Azure DB SKU families
}

const dbInstanceTypeMap: DBInstanceTypeMapEntry[] = [
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

export function getAllAvailableDBInstanceTypes(): string[] {
  return dbInstanceTypeMap.map((entry) => entry.name);
}

export function translateDBInstanceTypeToCloudOptions(
  typeName: string,
  provider: CloudProvider,
): string[] {
  const entry = dbInstanceTypeMap.find((e) => e.name === typeName);
  if (!entry) return [];
  return provider === 'aws' ? entry.aws : entry.azure;
}
