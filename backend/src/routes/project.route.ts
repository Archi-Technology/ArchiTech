// src/routes/project.route.ts
import { Router } from 'express';
import { projectController } from '../controllers/project.controller';

export const projectRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API for managing projects
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Fetch all projects for the authenticated user
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Successfully fetched projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       400:
 *         description: Problem fetching projects
 */
projectRouter.get('/', projectController.getAll.bind(projectController));

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the project
 *                 example: New Project
 *               data:
 *                 type: object
 *                 description: Additional project data
 *                 example: { key: "value" }
 *     responses:
 *       201:
 *         description: Successfully created project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Problem creating project
 */
projectRouter.post('/', projectController.create.bind(projectController));

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update an existing project
 *     tags: [Projects]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The project ID
 *         required: true
 *         schema:
 *           type: string
 *           example: 67543ee35ed1086ec36400c6
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the project
 *                 example: Updated Project Name
 *               data:
 *                 type: object
 *                 description: Updated project data
 *                 example: { key: "updatedValue" }
 *     responses:
 *       200:
 *         description: Successfully updated project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Problem updating project
 */
projectRouter.put('/:id', projectController.update.bind(projectController));

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The project ID
 *         required: true
 *         schema:
 *           type: string
 *           example: 67543ee35ed1086ec36400c6
 *     responses:
 *       200:
 *         description: Successfully deleted project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Project deleted
 *       400:
 *         description: Problem deleting project
 */
projectRouter.delete('/:id', projectController.delete.bind(projectController));
