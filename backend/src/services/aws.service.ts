import {
  PricingClient,
  GetProductsCommand,
  GetProductsCommandInput,
} from "@aws-sdk/client-pricing";
import dotenv from "dotenv";
dotenv.config();

// Define the LoadBalancerType type
export type LoadBalancerType = "application" | "network" | "classic";

export class awsService {
  client: PricingClient;

  constructor() {
    this.client = new PricingClient({
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

  async getEC2Pricing(
    instanceType: string,
    location: string,
    operatingSystem: string
  ): Promise<number | null> {
    let nextToken: string | undefined = undefined;

    instanceType = instanceType.trim();
    location = location.trim();
    operatingSystem = operatingSystem.trim();

    try {
      do {
        console.log(
          `Fetching EC2 pricing for: Location='${location}', InstanceType='${instanceType}', OS='${operatingSystem}'`
        );

        const params: GetProductsCommandInput = {
          ServiceCode: "AmazonEC2",
          Filters: [
            { Type: "TERM_MATCH", Field: "location", Value: location },
            { Type: "TERM_MATCH", Field: "instanceType", Value: instanceType },
            {
              Type: "TERM_MATCH",
              Field: "operatingSystem",
              Value: operatingSystem,
            },
            { Type: "TERM_MATCH", Field: "preInstalledSw", Value: "NA" },
            { Type: "TERM_MATCH", Field: "tenancy", Value: "Shared" },
            { Type: "TERM_MATCH", Field: "capacitystatus", Value: "Used" },
          ],
          MaxResults: 100,
          NextToken: nextToken,
        };

        const command = new GetProductsCommand(params);
        const response = await this.client.send(command);

        if (!response.PriceList || response.PriceList.length === 0) {
          console.error("No EC2 pricing data found.");
          return null;
        }

        for (const productString of response.PriceList) {
          const product = JSON.parse(productString);
          const terms = product.terms.OnDemand;
          for (const termKey in terms) {
            const priceDimensions = terms[termKey].priceDimensions;
            for (const dimensionKey in priceDimensions) {
              const pricePerHour = parseFloat(
                priceDimensions[dimensionKey].pricePerUnit.USD
              );
              console.log(`Found EC2 price: $${pricePerHour}/hour`);
              return pricePerHour;
            }
          }
        }

        nextToken = response.NextToken;
      } while (nextToken);

      console.error("Still no matching EC2 price found.");
      return null;
    } catch (err) {
      console.error("Error fetching EC2 pricing:", err);
      return null;
    }
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
