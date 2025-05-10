import { Router } from 'express';
import { gcpControllerInstance } from '../controllers/gcp.controller';

export const gcpRouter = Router();

/**
 * @swagger
 * /gcp/cost/gcs:
 *   get:
 *     description: Get cost of GCS storage
 *     tags:
 *       - GCP
 *     parameters:
 *       - name: location
 *         in: query
 *         description: The region of the GCS storage bucket
 *         required: true
 *         schema:
 *           type: string
 *           example: US
 *       - name: storageClass
 *         in: query
 *         description: The storage class of the GCS storage bucket
 *         required: true
 *         schema:
 *           type: string
 *           example: STANDARD
 *     responses:
 *       200:
 *         description: Successfully retrieved GCS cost
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 location:
 *                   type: string
 *                   example: "US"
 *                 storageClass:
 *                   type: string
 *                   example: "STANDARD"
 *                 pricePerGbPerMonth:
 *                   type: number
 *                   example: 0.02
 *       500:
 *         description: Failed to retrieve GCS cost
 */
gcpRouter.get(
    '/cost/gcs',
    gcpControllerInstance.getGCSStoragePricing.bind(gcpControllerInstance)
);
