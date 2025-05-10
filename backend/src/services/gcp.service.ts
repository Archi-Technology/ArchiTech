import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

export class gcpService {
    private billingClient: any;

    constructor() {
        // Load the service account key JSON file.
        const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;
        if (!keyFile) {
            throw new Error('GOOGLE_APPLICATION_CREDENTIALS environment variable is not set.');
        }
        const auth = new google.auth.GoogleAuth({
            keyFile: keyFile,
            scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        });
        this.billingClient = google.cloudbilling("v1");
    }


    async getGCSStoragePrice(location: string, storageClass: string): Promise<number | null> {
        const skuFilters: Record<string, Record<string, string>> = {
            "US": {
                "STANDARD": "storage.googleapis.com",
                "NEARLINE": "storage.googleapis.com",
                "COLDLINE": "storage.googleapis.com",
                "ARCHIVE": "storage.googleapis.com"
            }
        };

        const pricingData = skuFilters[location as keyof typeof skuFilters]?.[storageClass as keyof typeof skuFilters["US"]];

        if (!pricingData) {
            console.error(`No pricing data found for location '${location}' and storage class '${storageClass}'.`);
            return null;
        }

        try {
            const auth = new google.auth.GoogleAuth({
                keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Path to the Service Account key file
                scopes: ['https://www.googleapis.com/auth/cloud-platform'],
            });

            const billingAPI = google.cloudbilling('v1');
            const res = await billingAPI.services.skus.list({
                parent: `services/6F81-5844-456A`, // This is the service ID for GCS
            });

            const skus = res.data.skus;
            if (skus) {
                skus.forEach(sku => {
                    if (sku.pricingInfo && sku.pricingInfo.length > 0) {
                        const price = sku.pricingInfo[0].pricingExpression?.tieredRates?.[0]?.unitPrice?.nanos || 0;
                        console.log(`Price for ${sku.name}: $${price / 1e9}`);
                    } else {
                        console.log(`No pricing information available for ${sku.name}`);
                    }
                });
            } else {
                console.error('No SKUs found in the response.');
            }

            return parseFloat(pricingData) || null;
        } catch (error) {
            console.error('Error fetching GCS pricing:', error);
            return null;
        }
    }
}
