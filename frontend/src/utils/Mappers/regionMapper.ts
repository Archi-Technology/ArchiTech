export type Cloud = 'aws' | 'azure';

type RegionMap = Record<string, { aws?: string[]; azure?: string[] }>;

const regionMap: RegionMap = {
  'United States of America': {
    aws: [
      'US East (N. Virginia)',
      'US East (Ohio)',
      'US West (N. California)',
      'US West (Oregon)',
    ],
    azure: ['eastus', 'eastus2', 'westus', 'westus2'],
  },
  Canada: {
    aws: ['Canada (Central)'],
    azure: ['canadacentral', 'canadaeast'],
  },
  Germany: {
    aws: ['EU (Frankfurt)'],
    azure: ['germanywestcentral', 'germanynorth'],
  },
  'United Kingdom': {
    aws: ['EU (London)'],
    azure: ['uksouth', 'ukwest'],
  },
  France: {
    aws: ['EU (Paris)'],
    azure: ['francecentral', 'francesouth'],
  },
  Ireland: {
    aws: ['EU (Ireland)'],
    azure: ['northeurope'],
  },
  Brazil: {
    aws: ['South America (São Paulo)'],
    azure: ['brazilsouth', 'brazilsoutheast'],
  },
  India: {
    aws: ['Asia Pacific (Mumbai)'],
    azure: ['centralindia', 'southindia', 'westindia'],
  },
  Japan: {
    aws: ['Asia Pacific (Tokyo)', 'Asia Pacific (Osaka)'],
    azure: ['japaneast', 'japanwest'],
  },
  Australia: {
    aws: ['Asia Pacific (Sydney)'],
    azure: ['australiaeast', 'australiasoutheast'],
  },
  Singapore: {
    aws: ['Asia Pacific (Singapore)'],
    azure: ['southeastasia'],
  },
  'South Korea': {
    aws: ['Asia Pacific (Seoul)'],
    azure: ['koreacentral', 'koreasouth'],
  },
  'South Africa': {
    aws: ['Africa (Cape Town)'],
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
