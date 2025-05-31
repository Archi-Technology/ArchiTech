export type Cloud = 'aws' | 'azure';

type OSMap = Record<string, { aws?: string[]; azure?: string[] }>;

const osMap: OSMap = {
  Linux: {
    aws: ['Linux'],
    azure: ['Canonical:UbuntuServer:22_04-lts:latest'],
  },
  Windows: {
    aws: ['Windows_Server-2022-English-Full-Base'],
    azure: ['MicrosoftWindowsServer:WindowsServer:2022-datacenter:latest'],
  },
};

export function translateOSTypeToCloudOptions(
  osName: string,
  cloud: Cloud,
): string[] {
  const entry = Object.entries(osMap).find(
    ([key]) => key.toLowerCase() === osName.toLowerCase(),
  );
  return entry?.[1]?.[cloud] ?? [];
}

export function getAllAvailableOSNames(): string[] {
  return Object.keys(osMap).sort((a, b) => a.localeCompare(b));
}
