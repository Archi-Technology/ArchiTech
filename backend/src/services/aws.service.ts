import {
  PricingClient,
  GetProductsCommand,
  GetProductsCommandInput,
} from "@aws-sdk/client-pricing";
import dotenv from "dotenv";
dotenv.config();

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
    location: string = "EU (Frankfurt)",
    storageClass: string = "Standard"
  ): Promise<number | null> {
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
}
