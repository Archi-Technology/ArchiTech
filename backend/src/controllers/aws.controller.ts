import { Request, Response } from "express";
import { awsService, LoadBalancerType } from "../services/aws.service";

export class awsController {
  service: awsService = new awsService();

  constructor() {
    this.service = new awsService();
  }
  async getS3Pricing(req: Request, res: Response) {
    try {
      let { region, storageClass } = req.query;

      if (!region || !storageClass) {
        res.status(400).json({
          error: "Missing required parameters: region, storageClass",
        });
        return;
      }

      region = region.toString().trim().toLowerCase();
      storageClass = storageClass.toString().trim().toLowerCase();

      const price = await this.service.getS3StoragePrice(
        region as string,
        storageClass as string
      );

      if (price !== null) {
        res.status(200).json([
          {
            id: 0,
            provider: "AWS",
            region: region,
            storageTier: storageClass,
            pricePerGbPerMonth: price,
          },
        ]);
      } else {
        res.status(400).json({ message: "No S3 available", provider: "AWS" });
      }
    } catch (error: any) {
      console.error("Error fetching S3 pricing:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }

  async getEC2Pricing(req: Request, res: Response): Promise<void> {
    try {
      const { instanceType, region, os } = req.query;

      if (!instanceType || !region || !os) {
        res.status(400).json({
          error: "Missing required parameters: instanceType or region or os",
        });
        return;
      }

      const pricing = await this.service.getFormattedEC2Pricing(
        region as string,
        instanceType as string[],
        os as string
      );

      if (pricing === null) {
        res.status(400).json({ message: "No EC2 available", provider: "AWS" });
        return;
      }

      res.status(200).json(pricing);
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
        res.status(400).json({ message: "No ELB available", provider: "AWS" });
        return;
      }

      res.status(200).json([
        {
          id: 0,
          provider: "AWS",
          region,
          lbType,
          pricePerHour: price,
        },
      ]);
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

      const rdsPricingResult = await this.service.getRDSPricing(
        region as string,
        instanceType as string[],
        databaseEngine as string
      );

      if (
        !rdsPricingResult ||
        rdsPricingResult.price === null ||
        rdsPricingResult.type === null
      ) {
        res.status(400).json({ message: "No RDS available", provider: "AWS" });
        return;
      }

      res.status(200).json([
        {
          id: 0,
          provider: "AWS",
          region,
          instanceType: rdsPricingResult.type,
          databaseEngine,
          pricePerHour: rdsPricingResult.price,
        },
      ]);
    } catch (error) {
      console.error("Error fetching RDS pricing:", error);
      res.status(500).json({ error: "Failed to retrieve RDS pricing" });
    }
  }
}

export const awsControllerInstance = new awsController();
