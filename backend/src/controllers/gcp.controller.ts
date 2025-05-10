import { Request, Response } from 'express';
import { gcpService } from '../services/gcp.service';

export class gcpController {
    service: gcpService = new gcpService();

    constructor() {
        this.service = new gcpService();
    }
    async getGCSStoragePricing(req: Request, res: Response) {
        try {
            const { location, storageClass } = req.query;

            if (!location || !storageClass) {
                res.status(400).json({
                    error: "Missing required parameters: location, storageClass",
                });
                return;
            }

            const price = await this.service.getGCSStoragePrice(
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
        } catch (error) {
            console.error("Error fetching GCS pricing:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
}

export const gcpControllerInstance = new gcpController();