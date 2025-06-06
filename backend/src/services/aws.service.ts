import {
  PricingClient,
  GetProductsCommand,
  GetProductsCommandInput,
} from "@aws-sdk/client-pricing";

import {
  EC2Client,
  DescribeSpotPriceHistoryCommand,
} from "@aws-sdk/client-ec2";

import dotenv from "dotenv";
dotenv.config();

// Define the LoadBalancerType type
export type LoadBalancerType = "application" | "network" | "classic";

export enum PricingOptionType {
  OnDemand = "On-Demand",
  Reserved1Y = "Reserved (1Y)",
  Reserved3Y = "Reserved (3Y)",
  Savings1Y = "Savings Plan (1Y)",
  Savings3Y = "Savings Plan (3Y)",
}

export type PricingOption = {
  type: PricingOptionType;
  pricePerHour: number;
  reservationTerm?: string;
};

interface AwsPricingOutput {
  id: number;
  region: string;
  instanceType: string;
  productName: string;
  pricePerHour: number;
  os: string;
  reservationTerm?: string;
  spotInstance: boolean;
  provider: string;
}

interface EC2PricingResult {
  id: number;
  region: string;
  instanceType: string;
  productName: string;
  pricePerHour: number;
  os: string;
  reservationTerm?: string;
  spotInstance: boolean;
  provider: string;
}

export class awsService {
  client: PricingClient;
  ec2Client: EC2Client;

  constructor() {
    this.client = new PricingClient({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });

    this.ec2Client = new EC2Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });
  }

  async getS3StoragePrice(
    location: string,
    storageClass: string
  ): Promise<number | null> {
    location = location.trim();
    storageClass = storageClass.trim();

    const storageClassUsagePatterns: Record<string, string[]> = {
      Standard: ["TimedStorage-ByteHrs"],
      StandardIA: ["TimedStorage-IA-ByteHrs", "TimedStorage-SIA-ByteHrs"],
      OneZoneIA: ["TimedStorage-OneZoneIA-ByteHrs", "TimedStorage-ZIA-ByteHrs"],
      Glacier: ["TimedStorage-GlacierByteHrs"],
      GlacierDeepArchive: [
        "TimedStorage-GlacierDeepArchiveByteHrs",
        "TimedStorage-GDA-ByteHrs",
        "TimedStorage-DeepArchive-ByteHrs",
      ],
      IntelligentTiering: [
        "TimedStorage-INT-FA-ByteHrs",
        "TimedStorage-INT-IA-ByteHrs",
        "TimedStorage-INT-AIA-ByteHrs",
        "TimedStorage-INT-AA-ByteHrs",
        "TimedStorage-INT-DAA-ByteHrs",
      ],
      ReducedRedundancy: ["TimedStorage-RRS-ByteHrs"],
    };

    const usagePatterns = storageClassUsagePatterns[storageClass];
    if (!usagePatterns) {
      console.error(`Unknown storage class: '${storageClass}'`);
      return null;
    }

    let nextToken: string | undefined = undefined;

    try {
      do {
        const params: GetProductsCommandInput = {
          ServiceCode: "AmazonS3",
          Filters: [
            { Type: "TERM_MATCH", Field: "location", Value: location },
            { Type: "TERM_MATCH", Field: "productFamily", Value: "Storage" },
          ],
          MaxResults: 100,
          NextToken: nextToken,
        };

        const command = new GetProductsCommand(params);
        const response = await this.client.send(command);

        if (!response.PriceList || response.PriceList.length === 0) {
          console.error("No pricing data found.");
          return null;
        }

        for (const productString of response.PriceList) {
          const product = JSON.parse(productString);
          const attributes = product.product.attributes;

          const usageType = attributes.usagetype || "";

          const matchesStorageClass = usagePatterns.some((pattern) =>
            usageType.includes(pattern)
          );

          if (matchesStorageClass) {
            const terms = product.terms.OnDemand;
            for (const termKey in terms) {
              const priceDimensions = terms[termKey].priceDimensions;
              for (const dimensionKey in priceDimensions) {
                const pricePerGb = parseFloat(
                  priceDimensions[dimensionKey].pricePerUnit.USD
                );
                console.log(
                  `Found price for ${storageClass} in ${location}: $${pricePerGb}`
                );
                return pricePerGb;
              }
            }
          }
        }

        nextToken = response.NextToken;
      } while (nextToken);

      console.error(
        `No matching storage class '${storageClass}' found in location '${location}'.`
      );
      return null;
    } catch (err) {
      console.error("Error fetching pricing:", err);
      return null;
    }
  }

  async getFormattedEC2Pricing(location: string, instanceType: string, operatingSystem: string) {
    const params: GetProductsCommandInput = {
      ServiceCode: "AmazonEC2",
      Filters: [
        { Type: "TERM_MATCH", Field: "location", Value: location },
        { Type: "TERM_MATCH", Field: "instanceType", Value: instanceType },
        { Type: "TERM_MATCH", Field: "operatingSystem", Value: operatingSystem },
        { Type: "TERM_MATCH", Field: "preInstalledSw", Value: "NA" },
        { Type: "TERM_MATCH", Field: "tenancy", Value: "Shared" },
        { Type: "TERM_MATCH", Field: "capacitystatus", Value: "Used" },
      ],
      MaxResults: 100,
    };

    const command = new GetProductsCommand(params);
    const response = await this.client.send(command);

    const results: any[] = [];

    (response.PriceList ?? []).forEach((priceItemJson, index) => {
      const priceItem = JSON.parse(priceItemJson);
      const product = priceItem.product;
      const terms = priceItem.terms;
      const region = product.attributes.location || location;
      const os = product.attributes.operatingSystem || operatingSystem;
      const type = product.attributes.instanceType || instanceType;

      // On-Demand
      if (terms.OnDemand) {
        for (const termKey in terms.OnDemand) {
          const term = terms.OnDemand[termKey];
          for (const dimKey in term.priceDimensions) {
            const dim = term.priceDimensions[dimKey];
            if (dim.unit === "Hrs" && dim.pricePerUnit?.USD && !dim.description?.toLowerCase().includes("byol")) {
              results.push({
                id: results.length + 1,
                region,
                instanceType: type,
                productName: product.attributes.servicecode || "EC2",
                pricePerHour: parseFloat(dim.pricePerUnit.USD),
                os,
                reservationTerm: null,
                spotInstance: null,
                provider: "AWS",
              });
            }
          }
        }
      }

      // Reserved
      if (terms.Reserved) {
        for (const termKey in terms.Reserved) {
          const term = terms.Reserved[termKey];
          const length = term.termAttributes?.LeaseContractLength;
          const noUpfront = term.termAttributes?.PurchaseOption === "No Upfront";
          const standardOferringClass = term.termAttributes?.OfferingClass === "standard";

          let reservationTerm = null;
          if (length === "1yr") reservationTerm = "1 Year";
          if (length === "3yr") reservationTerm = "3 Years";

          for (const dimKey in term.priceDimensions) {
            const dim = term.priceDimensions[dimKey];
            if (dim.unit === "Hrs" && dim.pricePerUnit?.USD && noUpfront && standardOferringClass) {
              results.push({
                id: results.length + 1,
                region,
                instanceType: type,
                productName: product.attributes.servicecode || "EC2",
                pricePerHour: parseFloat(dim.pricePerUnit.USD),
                os,
                reservationTerm,
                spotInstance: null,
                provider: "AWS",
              });
            }
          }
        }
      }
    });

    // Spot (separate API)
    try {
      const spotCommand = new DescribeSpotPriceHistoryCommand({
        InstanceTypes: [instanceType as any], // Cast to match expected type
        ProductDescriptions: [operatingSystem],
        MaxResults: 1,
        StartTime: new Date(),
      });

      const spotResult = await this.ec2Client.send(spotCommand);
      const spotPriceEntry = spotResult.SpotPriceHistory?.[0];

      if (spotPriceEntry) {
        results.push({
          id: results.length + 1,
          location,
          instanceType,
          productName: "EC2 Spot",
          pricePerHour: parseFloat(spotPriceEntry.SpotPrice ?? "0"),
          os: operatingSystem,
          reservationTerm: null,
          spotInstance: true,
          provider: "AWS",
        });
      }
    } catch (error) {
      console.warn("Spot price fetch failed:", error);
    }

    return results;
  }

  async getElbPricing(
    location: string,
    loadBalancerType: LoadBalancerType
  ): Promise<number | null> {
    const productFamilyMap: Record<LoadBalancerType, string> = {
      application: "Load Balancer-Application",
      network: "Load Balancer-Network",
      classic: "Load Balancer",
    };

    const productFamily = productFamilyMap[loadBalancerType];
    if (!productFamily) {
      console.error(`Unknown load balancer type: ${loadBalancerType}`);
      return null;
    }

    let nextToken: string | undefined = undefined;

    try {
      do {
        const params: GetProductsCommandInput = {
          ServiceCode: "AmazonEC2",
          Filters: [
            { Type: "TERM_MATCH", Field: "location", Value: location },
            {
              Type: "TERM_MATCH",
              Field: "productFamily",
              Value: productFamily,
            },
          ],
          MaxResults: 100,
          NextToken: nextToken,
        };

        const command = new GetProductsCommand(params);
        const response = await this.client.send(command);

        if (!response.PriceList || response.PriceList.length === 0) {
          console.warn("No ELB pricing data found for given filters.");
          return null;
        }

        console.log(`Found ${response.PriceList.length} products.`);

        for (const productString of response.PriceList) {
          const product = JSON.parse(productString);
          const attributes = product.product.attributes;
          const usageType = attributes.usagetype || "";

          const isHourlyUsage =
            usageType.includes("LoadBalancerUsage") ||
            usageType.includes("LCUUsage");

          if (isHourlyUsage) {
            const terms = product.terms.OnDemand;
            for (const termKey in terms) {
              const priceDimensions = terms[termKey].priceDimensions;
              for (const dimensionKey in priceDimensions) {
                const pricePerHour = parseFloat(
                  priceDimensions[dimensionKey].pricePerUnit.USD
                );

                console.log(
                  `Found ELB price for ${loadBalancerType} in ${location}: $${pricePerHour}/hour`
                );

                return pricePerHour;
              }
            }
          } else {
            console.log("Skipping non-hourly usage product");
          }
        }

        nextToken = response.NextToken;
      } while (nextToken);

      console.error(
        `No matching ELB price found for type '${loadBalancerType}' in '${location}'.`
      );
      return null;
    } catch (err) {
      console.error("Error fetching ELB pricing:", err);
      return null;
    }
  }

  async getRDSPricing(
    location: string,
    instanceType: string,
    databaseEngine: string
  ): Promise<number | null> {
    let nextToken: string | undefined = undefined;

    try {
      do {
        const params: GetProductsCommandInput = {
          ServiceCode: "AmazonRDS",
          Filters: [
            { Type: "TERM_MATCH", Field: "location", Value: location },
            { Type: "TERM_MATCH", Field: "instanceType", Value: instanceType },
            {
              Type: "TERM_MATCH",
              Field: "databaseEngine",
              Value: databaseEngine,
            },
            {
              Type: "TERM_MATCH",
              Field: "deploymentOption",
              Value: "Single-AZ",
            },
          ],
          MaxResults: 100,
          NextToken: nextToken,
        };

        const command = new GetProductsCommand(params);
        const response = await this.client.send(command);

        if (!response.PriceList || response.PriceList.length === 0) {
          console.warn("No RDS pricing data found.");
          return null;
        }

        console.log(`Found ${response.PriceList.length} products.`);
        for (const productString of response.PriceList) {
          const product = JSON.parse(productString);
          const terms = product.terms.OnDemand;
          for (const termKey in terms) {
            const priceDimensions = terms[termKey].priceDimensions;
            for (const dimensionKey in priceDimensions) {
              const price = parseFloat(
                priceDimensions[dimensionKey].pricePerUnit.USD
              );
              console.log(
                `Found RDS price for ${databaseEngine} in ${location}: $${price}/hour`
              );
              return price;
            }
          }
        }

        nextToken = response.NextToken;
      } while (nextToken);

      return null;
    } catch (err) {
      console.error("Error fetching RDS pricing:", err);
      return null;
    }
  }
}
