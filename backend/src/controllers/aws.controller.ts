import { Request, Response } from "express";
import { awsService, LoadBalancerType } from "../services/aws.service";

export class awsController {
  service: awsService = new awsService();

  constructor() {
    this.service = new awsService();
  }
  async getS3Pricing(req: Request, res: Response) {
    try {
      const { location, storageClass } = req.query;

      if (!location || !storageClass) {
        res.status(400).json({
          error: "Missing required parameters: location, storageClass",
        });
        return;
      }

      const price = await this.service.getS3StoragePrice(
        location as string,
        storageClass as string
      );

      if (price !== null) {
        res.status(200).json({
          location: location,
          storageClass: storageClass,
          pricePerGbPerMonth: price,
        });
      } else {
        res.status(500).json({ error: "Failed to fetch pricing data." });
      }
    } catch (error: any) {
      console.error("Error fetching S3 pricing:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }

  async getEC2Pricing(req: Request, res: Response): Promise<void> {
    try {
      const { instanceType, region, operatingSystem } = req.query;

      if (!instanceType || !region || !operatingSystem) {
        res.status(400).json({
          error:
            "Missing required parameters: instanceType or region or operatingSystem",
        });
        return;
      }

      const price = await this.service.getEC2Pricing(
        instanceType as string,
        region as string,
        operatingSystem as string
      );

      if (price === null) {
        res.status(404).json({ error: "Pricing data not found" });
        return;
      }

      res.status(200).json({
        instanceType,
        region,
        operatingSystem,
        pricePerHour: price,
      });
    } catch (error) {
      console.error("Error fetching EC2 pricing:", error);
      res.status(500).json({ error: "Failed to retrieve EC2 pricing" });
    }
  }

  async getELBPricing(req: Request, res: Response): Promise<void> {
    try {
      const { region, lbType } = req.query;

      if (!region || !lbType) {
        res.status(400).json({
          error: "Missing required parameters: region or os",
        });
        return;
      }

      const price = await this.service.getElbPricing(
        region as string,
        lbType as LoadBalancerType
      );

      if (price === null) {
        res.status(404).json({ error: "Pricing data not found" });
        return;
      }

      res.status(200).json({
        region,
        lbType,
        pricePerHour: price,
      });
    } catch (error) {
      console.error("Error fetching ELB pricing:", error);
      res.status(500).json({ error: "Failed to retrieve ELB pricing" });
    }
  }

  async getRDSPricing(req: Request, res: Response): Promise<void> {
    try {
      const { region, instanceType, databaseEngine } = req.query;

      if (!region || !instanceType || !databaseEngine) {
        res.status(400).json({
          error:
            "Missing required parameters: region, instanceType, or databaseEngine",
        });
        return;
      }

      const price = await this.service.getRDSPricing(
        region as string,
        instanceType as string,
        databaseEngine as string
      );

      if (price === null) {
        res.status(404).json({ error: "Pricing data not found" });
        return;
      }

      res.status(200).json({
        region,
        instanceType,
        databaseEngine,
        pricePerHour: price,
      });
    } catch (error) {
      console.error("Error fetching RDS pricing:", error);
      res.status(500).json({ error: "Failed to retrieve RDS pricing" });
    }
  }
}

export const awsControllerInstance = new awsController();
