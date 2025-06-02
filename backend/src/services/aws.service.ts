import {
  PricingClient,
  GetProductsCommand,
  GetProductsCommandInput,
} from "@aws-sdk/client-pricing";
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
        { Type: "TERM_MATCH", Field: "PurchaseOption", Value: "No Upfront" },
        // { Type: "TERM_MATCH", Field: "termType", Value: "Reserved" },
        // { Type: "TERM_MATCH", Field: "reservedInstanceType", Value: "Standard" },
      ],
      MaxResults: 100,
    };

    const command = new GetProductsCommand(params);
    const response = await this.client.send(command);

    const formattedResults = (response.PriceList ?? []).map((priceItemJson, index) => {
      const priceItem = JSON.parse(priceItemJson);

      const product = priceItem.product;
      const terms = priceItem.terms;

      const productName = product.attributes?.servicecode || "Unknown";

      let pricePerHour: string | null = null;
      let reservationTerm: string | null = null;
      let spotInstance: string | null = null;

      if (terms.OnDemand) {
        for (const termKey in terms.OnDemand) {
          const term = terms.OnDemand[termKey];
          if (term.priceDimensions) {
            for (const dimKey in term.priceDimensions) {
              const dim = term.priceDimensions[dimKey];
              if (dim.unit === "Hrs" && dim.pricePerUnit && dim.pricePerUnit.USD) {
                pricePerHour = dim.pricePerUnit.USD;
              }
            }
          }
        }
      }

      if (terms.Reserved) {
        for (const termKey in terms.Reserved) {
          const termAttributes = terms.Reserved[termKey].termAttributes;
          if (termAttributes && termAttributes.LeaseContractLength) {
            reservationTerm = termAttributes.LeaseContractLength;
            break;
          }
        }
      }

      if (terms.Spot) {
        spotInstance = "Yes";
      } else {
        spotInstance = null;
      }

      return {
        id: index + 1,
        region: product.attributes.location || location,
        instanceType: product.attributes.instanceType || instanceType,
        pricePerHour: pricePerHour ? parseFloat(parseFloat(pricePerHour).toFixed(6)) : null,
        os: product.attributes.operatingSystem || operatingSystem,
        reservationTerm,
        spotInstance,
        provider: "AWS",
      };
    });

    return formattedResults;
  }


  async getEC2Pricing(
    instanceType: string,
    location: string,
    operatingSystem: string
  ): Promise<
    Array<{
      id: number;
      region: string;
      instanceType: string;
      productName: string;
      pricePerHour: number;
      os: string;
      reservationTerm: string | null;
      spotInstance: boolean;
      provider: string;
      usageType: string;
    }> | null
  > {
    let nextToken: string | undefined = undefined;
    const results: any[] = [];

    instanceType = instanceType.trim();
    location = location.trim();
    operatingSystem = operatingSystem.trim();

    try {
      let idCounter = 0;

      do {
        console.log(
          `Fetching EC2 pricing for: Location='${location}', InstanceType='${instanceType}', OS='${operatingSystem}'`
        );

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
          const productAttributes = product.product?.attributes || {};

          // Extract pricing helper
          const extractPricing = (
            termsBlock: any,
            spotInstance: boolean,
            reservationTerm: string | null
          ) => {
            if (!termsBlock) return;
            for (const termKey in termsBlock) {
              const term = termsBlock[termKey];
              const priceDimensions = term.priceDimensions;
              const termAttributes = term.termAttributes || {};

              for (const dimKey in priceDimensions) {
                const dim = priceDimensions[dimKey];

                const pricePerHourStr = dim.pricePerUnit?.USD ?? "0";
                const pricePerHour = parseFloat(pricePerHourStr);
                const unit = dim.unit || "";
                const description = dim.description || "";
                const usageType = dim.usageType || "";

                // Filter out non-hour units and zero prices
                if (!unit.toLowerCase().includes("hour") || pricePerHour === 0 || pricePerHour > 10) {
                  continue;
                }

                // Filter BYOL Windows prices if OS is Windows
                if (
                  operatingSystem.toLowerCase() === "windows" &&
                  description.toLowerCase().includes("byol")
                ) {
                  continue;
                }

                // For reserved terms, allow all purchaseOptions and offeringClasses (log for debugging)
                if (reservationTerm) {
                  const purchaseOption = (termAttributes.PurchaseOption || "").toLowerCase();
                  const offeringClass = (termAttributes.OfferingClass || "").toLowerCase();

                  // Only include reserved pricing if purchaseOption and offeringClass exist (skip upfront fees)
                  if (!purchaseOption || !offeringClass) {
                    continue;
                  }

                  // Skip upfront fees (unit: Quantity)
                  if (unit.toLowerCase() === "quantity") {
                    continue;
                  }
                }

                results.push({
                  id: idCounter++,
                  region: productAttributes.location || location,
                  instanceType: productAttributes.instanceType || instanceType,
                  productName: productAttributes["productFamily"] || productAttributes["sku"] || "Unknown",
                  pricePerHour,
                  os: productAttributes.operatingSystem || operatingSystem,
                  reservationTerm,
                  spotInstance,
                  provider: "aws",
                  usageType,
                });
              }
            }
          };

          // OnDemand terms (non-spot, non-reserved)
          extractPricing(product.terms?.OnDemand, false, null);

          // Reserved terms (may have reservation term)
          const reservedTerms = product.terms?.Reserved || {};
          for (const reservedKey in reservedTerms) {
            const reservationTermRaw = reservedTerms[reservedKey].termAttributes?.LeaseContractLength || null;
            let reservationTerm = reservationTermRaw;
            if (reservationTermRaw) {
              reservationTerm = reservationTermRaw
                .replace("yr", " Year")
                .replace("years", "Years");
            }
            extractPricing({ [reservedKey]: reservedTerms[reservedKey] }, false, reservationTerm);
          }

          // Spot terms
          extractPricing(product.terms?.Spot, true, null);
        }

        nextToken = response.NextToken;
      } while (nextToken);

      if (results.length === 0) {
        console.error("Still no matching EC2 price found.");
        return null;
      }

      return results;
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
