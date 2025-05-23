import { Router } from "express";
import { awsControllerInstance } from "../controllers/aws.controller";

export const awsRouter = Router();
/**
 * @swagger
 * /aws/cost/s3:
 *   get:
 *     description: get cost of s3 bucket
 *     tags:
 *       - AWS
 *     parameters:
 *       - name: region
 *         in: query
 *         description: The region of the s3 bucket
 *         required: false
 *         schema:
 *           type: string
 *           example: EU (Frankfurt)
 *       - name: storageClass
 *         in: query
 *         description: The storage class of the s3 bucket
 *         required: false
 *         schema:
 *           type: string
 *           example: Standard
 *     responses:
 *       200:
 *         description: successfully retrieved s3 cost
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 region:
 *                   type: string
 *                   example: "EU (Frankfurt)"
 *                 storageClass:
 *                   type: string
 *                   example: "Standard"
 *                 cost:
 *                   type: number
 *                   example: 0.023
 *       500:
 *         description: failed to retrieve s3 cost
 */
awsRouter.get(
  "/cost/s3",
  awsControllerInstance.getS3Pricing.bind(awsControllerInstance)
);

/**
 * @swagger
 * /aws/cost/ec2:
 *   get:
 *     description: Get cost of EC2 instances
 *     tags:
 *       - AWS
 *     parameters:
 *       - name: instanceType
 *         in: query
 *         description: The type of EC2 instance (e.g., t2.micro, m5.large)
 *         required: true
 *         schema:
 *           type: string
 *           example: i3.large
 *       - name: region
 *         in: query
 *         description: The AWS region (e.g., us-east-1, eu-west-1)
 *         required: true
 *         schema:
 *           type: string
 *           example: Canada (Central)
 *       - name: os
 *         in: query
 *         description: The operating system (e.g., Linux, Windows)
 *         required: true
 *         schema:
 *           type: string
 *           example: Windows
 *     responses:
 *       200:
 *         description: Successfully retrieved EC2 cost
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 instanceType:
 *                   type: string
 *                   example: t2.micro
 *                 region:
 *                   type: string
 *                   example: us-east-1
 *                 os:
 *                   type: string
 *                   example: Linux
 *                 pricePerHour:
 *                   type: number
 *                   example: 0.0116
 *       500:
 *         description: Failed to retrieve EC2 cost
 */
awsRouter.get(
  "/cost/ec2",
  awsControllerInstance.getEC2Pricing.bind(awsControllerInstance)
);

/**
 * @swagger
 * /aws/cost/elb:
 *   get:
 *     description: Get pricing for ELB
 *     tags:
 *       - AWS
 *     parameters:
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *           example: "US East (N. Virginia)"
 *         description: Region substring to filter pricing data
 *       - in: query
 *         name: lbType
 *         schema:
 *           type: string
 *           example: "application"
 *         description: Type of load balancer (application, network, classic)
 *     responses:
 *       200:
 *         description: ELB pricing data
 *       500:
 *         description: Server error
 */
awsRouter.get(
  "/cost/elb",
  awsControllerInstance.getELBPricing.bind(awsControllerInstance)
);

/**
 * @swagger
 * /aws/cost/rds:
 *   get:
 *     description: Get pricing for Amazon RDS instances
 *     tags:
 *       - AWS
 *     parameters:
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *           example: "US East (N. Virginia)"
 *         required: true
 *         description: Region for the RDS instance
 *       - in: query
 *         name: instanceType
 *         schema:
 *           type: string
 *           example: db.t3.micro
 *         required: true
 *         description: RDS instance type
 *       - in: query
 *         name: databaseEngine
 *         schema:
 *           type: string
 *           example: PostgreSQL
 *         required: true
 *         description: RDS database engine (e.g., MySQL, PostgreSQL)
 *     responses:
 *       200:
 *         description: RDS pricing data
 *       400:
 *         description: Missing or invalid parameters
 *       500:
 *         description: Server error
 */
awsRouter.get(
  "/cost/rds",
  awsControllerInstance.getRDSPricing.bind(awsControllerInstance)
);