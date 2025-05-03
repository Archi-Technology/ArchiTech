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
azureRouter.get("/cost/blob", async (req, res) => {
  try {
    await azureControllerInstance.getBlobPricing(req, res);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /azure/cost/vm:
 *   get:
 *     description: Get cost estimation for Azure Virtual Machines
 *     tags:
 *       - Azure
 *     parameters:
 *       - in: query
 *         name: region
 *         schema: { type: string }
 *         required: true
 *         example: eastus
 *       - in: query
 *         name: vmSize
 *         schema: { type: string }
 *         required: true
 *         example: Standard_D2s_v3
 *       - in: query
 *         name: osType
 *         schema: { type: string }
 *         required: true
 *         example: Windows
 *       - in: query
 *         name: savingPlan
 *         schema: { type: boolean }
 *         required: false
 *         example: false
 *     responses:
 *       200:
 *         description: VM pricing retrieved
 *       500:
 *         description: Internal error
 */
azureRouter.get("/cost/vm", async (req, res) => {
  try {
    await azureControllerInstance.getVmPricing(req, res);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /azure/cost/loadbalancer:
 *   get:
 *     description: Get cost estimation for Azure Load Balancer
 *     tags:
 *       - Azure
 *     parameters:
 *       - in: query
 *         name: region
 *         required: true
 *         schema: { type: string }
 *         example: eastus
 *       - in: query
 *         name: type
 *         required: true
 *         schema: { type: string }
 *         example: Basic
 *     responses:
 *       200:
 *         description: Cost retrieved
 *       500:
 *         description: Internal error
 */
azureRouter.get("/cost/loadbalancer", async (req, res) => {
  try {
    await azureControllerInstance.getLoadBalancerPricing(req, res);
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});
