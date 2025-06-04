// utils/dbEngineMapper.ts

type CloudProvider = 'aws' | 'azure';

interface DBEngineMapEntry {
  name: string;
  aws: string[];
  azure: string[];
}

const dbEngineMap: DBEngineMapEntry[] = [
  {
    name: 'PostgreSQL',
    aws: ['postgres'],
    azure: ['PostgreSQL'],
  },
  {
    name: 'MySQL',
    aws: ['mysql'],
    azure: ['MySQL'],
  },
  {
    name: 'MariaDB',
    aws: ['mariadb'],
    azure: ['MariaDB'],
  },
  {
    name: 'SQL Server',
    aws: ['sqlserver-ex', 'sqlserver-web', 'sqlserver-se', 'sqlserver-ee'],
    azure: ['SQLServer'],
  },
  {
    name: 'Oracle',
    aws: ['oracle-se1', 'oracle-se2', 'oracle-ee'],
    azure: ['Oracle'],
  },
];

export function getAllAvailableDBEngineNames(): string[] {
  return dbEngineMap.map((entry) => entry.name);
}

export function translateDBEngineToCloudOptions(
  engineName: string,
  provider: CloudProvider,
): string[] {
  const entry = dbEngineMap.find((e) => e.name === engineName);
  if (!entry) return [];
  return provider === 'aws' ? entry.aws : entry.azure;
}
