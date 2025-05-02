import { Request, Response } from "express";
import { awsService } from "../services/aws.service";

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
          pricePerGb: price,
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
        const { region, os } = req.query;
    
        if (!region || !os) {
            res.status(400).json({
            error: "Missing required parameters: region or os",
            });
            return;
        }
    
        const price = await this.service.getELBPrice(
            region as string,
            os as string
        );
    
        if (price === null) {
            res.status(404).json({ error: "Pricing data not found" });
            return;
        }
    
        res.status(200).json({
            region,
            os,
            pricePerHour: price,
        });
        } catch (error) {
        console.error("Error fetching ELB pricing:", error);
        res.status(500).json({ error: "Failed to retrieve ELB pricing" });
        }
    }
}

export const awsControllerInstance = new awsController();
