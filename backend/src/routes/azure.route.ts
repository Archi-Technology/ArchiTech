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

/**
 * @swagger
 * /azure/cost/sql:
 *   get:
 *     description: Get Azure SQL Database vCore-based pricing
 *     tags:
 *       - Azure
 *     parameters:
 *       - in: query
 *         name: region
 *         required: true
 *         schema: { type: string }
 *         example: uaecentral
 *       - in: query
 *         name: skuName
 *         required: true
 *         schema: { type: string }
 *         example: 36 vCore
 *       - in: query
 *         name: productName
 *         required: true
 *         schema: { type: string }
 *         example: SQL Database Single/Elastic Pool General Purpose - Compute FSv2 Series
 *     responses:
 *       200:
 *         description: Pricing retrieved
 *       400:
 *         description: Missing or invalid parameters
 *       404:
 *         description: No pricing data found
 *       500:
 *         description: Server error
 */
azureRouter.get("/cost/sql", async (req, res) => {
  try {
    await azureControllerInstance.getSqlDbPricing(req, res);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});