import { Request, Response } from "express";
import { awsService } from "../services/aws.service";

export class awsController {
  service: awsService = new awsService();

  constructor() {
    this.service = new awsService();
  }
  async getS3Pricing(req: Request, res: Response) {
    try {
      const location = (req.query.location as string) || "EU (Frankfurt)";
      const storageClass = (req.query.storageClass as string) || "Standard";
      const gigabytes = parseInt(req.query.gigabytes as string) || 1;
      const pricePerGb = await this.service.getS3StoragePrice(
        location,
        storageClass
      );
      if (pricePerGb !== null) {
        const totalPrice = pricePerGb * gigabytes;
        res.status(200).json({ price: totalPrice });
      } else {
        res.status(500).json({ error: "Failed to fetch pricing data." });
      }
    } catch (error: any) {
      console.error("Error fetching S3 pricing:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
}

export const awsControllerInstance = new awsController();
