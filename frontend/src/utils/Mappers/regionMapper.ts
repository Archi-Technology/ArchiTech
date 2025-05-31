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

const { SubscriptionClient } = require('@azure/arm-subscriptions');
  const { DefaultAzureCredential } = require('@azure/identity');
  const AWS = require('aws-sdk');

  async function getAzureRegions() {
    const credential = new DefaultAzureCredential();
    const client = new SubscriptionClient(credential);
    const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;

    const result = await client.subscriptions.listLocations(subscriptionId);
    const azureRegions = result.map(
      (location: any) => location.displayName || location.name,
    );
    return azureRegions;
  }

  async function getAWSRegions() {
    const ec2 = new AWS.EC2({ region: 'us-east-1' });
    const result = await ec2.describeRegions().promise();
    const awsRegions = result.Regions.map((region: { RegionName: string }) => region.RegionName);
    return awsRegions;
  }

  function normalizeRegionName(name: string) {
    return name.toLowerCase().replace(/\s+/g, '');
  }

  async function getCombinedRegions() {
    const [azureRegions, awsRegions] = await Promise.all([
      getAzureRegions(),
      getAWSRegions(),
    ]);

    const seen = new Set();
    const allRegions = [...azureRegions, ...awsRegions].filter((region) => {
      const norm = normalizeRegionName(region);
      if (seen.has(norm)) return false;
      seen.add(norm);
      return true;
    });

    console.log('Combined Unique Regions:');
    allRegions.forEach((region) => console.log(region));
  }

  getCombinedRegions().catch((err) => console.error(err));

export function translateLocationToRegionCodes(
  location: string,
  cloud: Cloud,
): string[] {
  const entry = Object.entries(regionMap).find(
    ([key]) => key.toLowerCase() === location.toLowerCase(),
  );
  return entry?.[1]?.[cloud] ?? [];
}

export async function getAllAvailableLocations(): Promise<string[]> {
  // return Object.keys(regionMap).sort((a, b) => a.localeCompare(b));
  const awsRegions = await getAWSRegions();
  // Convert array to a record with region name as key and true as value
  return awsRegions.reduce(
    (acc: Record<string, boolean>, region: string): Record<string, boolean> => {
      acc[region] = true;
      return acc;
    },
    {} as Record<string, boolean>
  );
}
