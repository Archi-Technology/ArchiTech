import {Router} from 'express';
import { chatController } from '../controllers/chat.controller';

export const chatRouter = Router();

/**
 * @swagger
 * /chat:
 *   post:
 *     description: Ask a question
 *     tags:
 *       - Chat
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The user's question
 *                 example: "What cloud is best for me?"
 *               userId:
 *                 type: string
 *                 description: The user's ID
 *                 example: "1234567890abcdef12345678"
 *     responses:
 *       200:
 *         description: Question received
 *       400:
 *         description: Problem creating chat
 */
chatRouter.post('/', chatController.askQuestion.bind(chatController));