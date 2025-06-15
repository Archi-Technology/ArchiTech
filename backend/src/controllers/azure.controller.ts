import { Request, Response } from "express";
import { AzureService } from "../services/azure.service";

export class AzureController {
  service: AzureService;

  constructor() {
    this.service = new AzureService();
  }

  async getBlobPricing(req: Request, res: Response) {
    try {
      const { region, storageTier, redundancy } = req.query;

      if (!region || !storageTier || !redundancy) {
        return res.status(400).json({
          error: "Missing required parameters: region, storageTier, redundancy",
        });
      }

      const price = await this.service.getBlobStoragePrice({
        region: region as string,
        storageTier: storageTier as string,
        redundancy: redundancy as string,
      });
      price.id = 0;
      price.provider = "azure";
      if (price) {
        res.status(200).json([price]);
      } else {
        res
          .status(400)
          .json({ message: "No Blob available", provider: "azure" });
      }
    } catch (error: any) {
      console.error("Error fetching Azure Blob pricing:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async getVmPricing(req: Request, res: Response) {
    try {
      const { region, instanceType, os } = req.query;

      if (!region || !instanceType || !os) {
        return res.status(400).json({
          error: "Missing required parameters: region, instanceType, os",
        });
      }

      const price = await this.service.getVmPricing({
        region: region as string,
        instanceType: instanceType as string,
        os: os as string,
      });

      if (price) {
        res.status(200).json(price);
      } else {
        res.status(400).json({ message: "No VM available", provider: "azure" });
      }
    } catch (error) {
      console.error("Error fetching Azure VM pricing:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async getLoadBalancerPricing(req: Request, res: Response) {
    const { region, lbType } = req.query;

    if (!region || !lbType) {
      return res.status(400).json({
        error: "Missing required parameters: region, loadBalancerType",
      });
    }

    const price = await this.service.getLoadBalancerPrice(
      region as string,
      lbType as string
    );
    price.id = 0;
    price.provider = "azure";

    if (price) {
      res.status(200).json([price]);
    } else {
      res.status(400).json({ message: "No LB available", provider: "azure" });
    }
  }

  async getSqlDbPricing(req: Request, res: Response) {
    try {
      const { region, skuName } = req.query;

      if (!region || !skuName) {
        return res
          .status(400)
          .json({ error: "region and skuName are required." });
      }

      const result = await this.service.getSqlDbPricing({
        region: region as string,
        skuName: skuName as string,
      });

      if (result) {
        res.status(200).json([result]);
      } else {
        res.status(400).json([{ message: "No SQL available", provider: "azure" }]);
      }
    } catch (e) {
      console.error("Error:", e);
      return res.status(500).json({ error: "Internal error" });
    }
  }
}

export const azureControllerInstance = new AzureController();
