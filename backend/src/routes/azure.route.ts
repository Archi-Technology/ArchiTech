import { Router } from "express";
import { azureControllerInstance } from "../controllers/azure.controller";

export const azureRouter = Router();

/**
 * @swagger
 * /azure/cost/blob:
 *   get:
 *     description: Get cost estimation for Azure Blob Storage
 *     tags:
 *       - Azure
 *     parameters:
 *       - in: query
 *         name: region
 *         schema: { type: string }
 *         required: true
 *         example: eastus
 *       - in: query
 *         name: storageTier
 *         schema: { type: string }
 *         required: true
 *         example: Hot
 *       - in: query
 *         name: redundancy
 *         schema: { type: string }
 *         required: true
 *         example: LRS
 *       - in: query
 *         name: dataStoredGB
 *         schema: { type: number }
 *         required: true
 *         example: 100
 *       - in: query
 *         name: operations
 *         schema:
 *           type: string
 *         required: false
 *         description: |
 *           JSON string like:
 *           {
 *             "read": 1000,
 *             "write": 500
 *           }
 *       - in: query
 *         name: dataRetrievalGB
 *         schema: { type: number }
 *         required: false
 *         example: 10
 *       - in: query
 *         name: blobType
 *         schema: { type: string }
 *         required: false
 *         example: BlockBlob
 *       - in: query
 *         name: blobSizeMB
 *         schema: { type: number }
 *         required: false
 *         example: 10
 *       - in: query
 *         name: numberOfBlobs
 *         schema: { type: number }
 *         required: false
 *         example: 1000
 *       - in: query
 *         name: snapshotsEnabled
 *         schema: { type: boolean }
 *         required: false
 *         example: true
 *       - in: query
 *         name: versioningEnabled
 *         schema: { type: boolean }
 *         required: false
 *         example: false
 *       - in: query
 *         name: lifecyclePolicyEnabled
 *         schema: { type: boolean }
 *         required: false
 *         example: true
 *       - in: query
 *         name: savingPlan
 *         schema: { type: boolean }
 *         required: false
 *         example: false
 *     responses:
 *       200:
 *         description: Cost retrieved
 *       500:
 *         description: Internal error
 */
azureRouter.get(
  "/cost/blob",
  async (req, res) => {
    try {
      await azureControllerInstance.getBlobPricing(req, res);
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);
