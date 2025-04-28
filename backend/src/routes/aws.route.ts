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
 *       - name: gigabytes
 *         in: query
 *         description: The number of gigabytes to be stored in the s3 bucket
 *         required: false
 *         schema:
 *           type: number
 *           example: 1
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
