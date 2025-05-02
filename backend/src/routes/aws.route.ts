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
 *       - name: location
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
 *                 id:
 *                   type: integer
 *                   example: 123
 *                 username:
 *                   type: string
 *                   example: "Sample Name"
 *                 password:
 *                   type: string
 *                   example: encryptedpassword
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
 *       - name: operatingSystem
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
 *                 operatingSystem:
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
 *     summary: Get pricing for ELB
 *     parameters:
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Region substring to filter pricing data
 *       - in: query
 *         name: os
 *         schema:
 *           type: string
 *         description: Operating system substring to filter pricing data
 *     responses:
 *       200:
 *         description: ELB pricing data
 *       500:
 *         description: Server error
 */
