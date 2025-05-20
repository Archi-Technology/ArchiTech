import { Router } from "express";
import { resourceController } from "../controllers/resource.controller";

export const resourceRouter = Router();


/**
 * @swagger
 * /api/resource:
 *   post:
 *     description: Create a new resource
 *     tags:
 *       - Resource
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the resource
 *                 example: New Resource
 *               projectId:
 *                 type: string
 *                 description: The ID of the project to which the resource belongs
 *                 example: 1234567890abcdef12345678
 *               cloudProvider:
 *                 type: string
 *                 description: The cloud provider for the resource (e.g., AWS, GCP, Azure)
 *                 example: AWS
 *               type: 
 *                type: string
 *                description: The type of the resource (e.g., EC2, S3, etc.)
 *               example: EC2
*/

resourceRouter.post('/create', resourceController.create.bind(resourceController));