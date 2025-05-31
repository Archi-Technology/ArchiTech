import { Request, Response } from "express";
import { AzureService } from "../services/azure.service";

export class AzureController {
  service: AzureService;

  constructor() {
    this.service = new AzureService();
  }

  async getAllRegions(req: Request, res: Response) {
    try {
      const regions = await this.service.getAllRegions();

      if (!regions) {
        return res
          .status(500)
          .json({ error: "Failed to retrieve Azure regions" });
      }

      return res.status(200).json({
        count: regions.length,
        regions,
      });
    } catch (error) {
      console.error("Error fetching Azure regions:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getBlobPricing(req: Request, res: Response) {
    try {
      const { region, storageTier, redundancy, dataStoredGB } = req.query;

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

  async getVmPricing(req: Request, res: Response) {
    try {
      const { region, vmSize, osType } = req.query;

      if (!region || !vmSize || !osType) {
        return res.status(400).json({
          error: "Missing required parameters: region, vmSize, osType",
        });
      }

      const price = await this.service.getVmPricing({
        region: region as string,
        vmSize: vmSize as string,
        osType: osType as string,
      });

      if (price) {
        return res.status(200).json(price);
      } else {
        return res.status(500).json({ error: "Failed to fetch VM pricing." });
      }
    } catch (error) {
      console.error("Error fetching Azure VM pricing:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async getLoadBalancerPricing(req: Request, res: Response) {
    const { region, type } = req.query;

    if (!region || !type) {
      return res.status(400).json({
        error: "Missing required parameters: region, loadBalancerType",
      });
    }

    const price = await this.service.getLoadBalancerPrice(
      region as string,
      type as string
    );

    if (price) {
      return res.status(200).json(price);
    } else {
      return res
        .status(404)
        .json({ error: "No pricing data found for specified parameters." });
    }
  }

  async getSqlDbPricing(req: Request, res: Response) {
    try {
      const { region, skuName, productName } = req.query;

      if (!region || !skuName || !productName) {
        return res
          .status(400)
          .json({ error: "region, skuName, and productName are required." });
      }

      const result = await this.service.getSqlDbPricing({
        region: region as string,
        skuName: skuName as string,
        productName: productName as string,
      });

      if (result) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({ error: "No pricing found." });
      }
    } catch (e) {
      console.error("Error:", e);
      return res.status(500).json({ error: "Internal error" });
    }
  }
}

export const azureControllerInstance = new AzureController();
