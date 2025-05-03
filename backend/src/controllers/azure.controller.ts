import { Request, Response } from "express";
import { AzureService } from "../services/azure.service";

export class AzureController {
  service: AzureService;

  constructor() {
    this.service = new AzureService();
  }

  async getBlobPricing(req: Request, res: Response) {
    try {
      const {
        region,
        storageTier,
        redundancy,
        dataStoredGB,
        operations,
        dataRetrievalGB,
        blobType,
        blobSizeMB,
        numberOfBlobs,
        snapshotsEnabled,
        versioningEnabled,
        lifecyclePolicyEnabled,
        savingPlan,
      } = req.query;

      if (!region || !storageTier || !redundancy || !dataStoredGB) {
        return res.status(400).json({
          error:
            "Missing required parameters: region, storageTier, redundancy, dataStoredGB",
        });
      }

      const price = await this.service.getBlobStoragePrice({
        region: region as string,
        storageTier: storageTier as string,
        redundancy: redundancy as string,
        dataStoredGB: Number(dataStoredGB),
        operations: operations ? JSON.parse(operations as string) : {},
        dataRetrievalGB: Number(dataRetrievalGB || 0),
        blobType: blobType as string,
        blobSizeMB: Number(blobSizeMB || 0),
        numberOfBlobs: Number(numberOfBlobs || 0),
        snapshotsEnabled: snapshotsEnabled === "true",
        versioningEnabled: versioningEnabled === "true",
        lifecyclePolicyEnabled: lifecyclePolicyEnabled === "true",
      });

      if (price) {
        return res.status(200).json(price);
      } else {
        return res.status(500).json({ error: "Failed to fetch pricing data." });
      }
    } catch (error: any) {
      console.error("Error fetching Azure Blob pricing:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
}

export const azureControllerInstance = new AzureController();
