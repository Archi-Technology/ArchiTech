export type Cloud = 'aws' | 'azure';

type RegionMap = Record<string, { aws?: string[]; azure?: string[] }>;

const regionMap: RegionMap = {
  'United States of America': {
    aws: ['us-east-1', 'us-east-2', 'us-west-1', 'us-west-2'],
    azure: ['eastus', 'eastus2', 'westus', 'westus2'],
  },
  Canada: {
    aws: ['ca-central-1'],
    azure: ['canadacentral', 'canadaeast'],
  },
  Germany: {
    aws: ['eu-central-1'],
    azure: ['germanywestcentral', 'germanynorth'],
  },
  'United Kingdom': {
    aws: ['eu-west-2'],
    azure: ['uksouth', 'ukwest'],
  },
  France: {
    aws: ['eu-west-3'],
    azure: ['francecentral', 'francesouth'],
  },
  Ireland: {
    aws: ['eu-west-1'],
    azure: ['northeurope'],
  },
  Brazil: {
    aws: ['sa-east-1'],
    azure: ['brazilsouth', 'brazilsoutheast'],
  },
  India: {
    aws: ['ap-south-1'],
    azure: ['centralindia', 'southindia', 'westindia'],
  },
  Japan: {
    aws: ['ap-northeast-1', 'ap-northeast-3'],
    azure: ['japaneast', 'japanwest'],
  },
  Australia: {
    aws: ['ap-southeast-2'],
    azure: ['australiaeast', 'australiasoutheast'],
  },
  Singapore: {
    aws: ['ap-southeast-1'],
    azure: ['southeastasia'],
  },
  'South Korea': {
    aws: ['ap-northeast-2'],
    azure: ['koreacentral', 'koreasouth'],
  },
  'South Africa': {
    aws: ['af-south-1'],
    azure: ['southafricanorth', 'southafricawest'],
  },
  'United Arab Emirates': {
    aws: [],
    azure: ['uaenorth', 'uaecentral'],
  },
};

export function translateLocationToRegionCodes(
  location: string,
  cloud: Cloud,
): string[] {
  const entry = Object.entries(regionMap).find(
    ([key]) => key.toLowerCase() === location.toLowerCase(),
  );
  return entry?.[1]?.[cloud] ?? [];
}

export function getAllAvailableLocations(): string[] {
  return Object.keys(regionMap).sort((a, b) => a.localeCompare(b));
}
