import { Router } from "express";
import { commentController } from "../controllers/comment.controller";

export const commentRouter = Router();

/**
 * @swagger
 * /comment/create:
 *   post:
 *     description: create a new comment
 *     parameters:
 *       - name: text
 *         in: body
 *         description: The comment text
 *         required: true
 *         schema:
 *           type: string
 *           example: hello
 *       - name: postId
 *         in: body
 *         description: The comment related post id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67543ee35ed1086ec36400c6
 *     responses:
 *       200:
 *         description: sucsses creating comment
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: create entity sucssfully
 *       400:
 *         description: problem creating comment 
 */
commentRouter.post('/create', commentController.create.bind(commentController));

/**
 * @swagger
 * /comment/:id:
 *   delete:
 *     description: delete a comment by id
 *     parameters:
 *       - name: id
 *         in: params
 *         description: The comment id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67543ee35ed1086ec36400c6
 *     responses:
 *       200:
 *         description: sucsses deleting comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isDeleted:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: problem deleting comment 
 */
commentRouter.delete('/:id', commentController.deleteById.bind(commentController));


/**
 * @swagger
 * /comment/:id:
 *   get:
 *     description: get a comment by id
 *     parameters:
 *       - name: id
 *         in: params
 *         description: The comment id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67543ee35ed1086ec36400c6
 *     responses:
 *       200:
 *         description: sucsses fetching comment information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 67543ee35ed1086ec36400c6
 *                 userId:
 *                   type: string
 *                   example: 67543ee35ed1086ec36400c6
 *                 postId:
 *                   type: string
 *                   example: 67543ee35ed1086ec36400c6
 *                 text:
 *                   type: string
 *                   example: great post
 *                 date:
 *                   type: date
 *                   example: 2024-12-07T12:26:11.003Z
 *       400:
 *         description: problem fetching comment 
 */
commentRouter.get('/:id', commentController.getById.bind(commentController));

/**
 * @swagger
 * /comment/post/:postid:
 *   get:
 *     description: comments by post id
 *     parameters:
 *       - name: postid
 *         in: params
 *         description: The post id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67543ee35ed1086ec36400c6
 *     responses:
 *       200:
 *         description: sucsses fetching comments by postid
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 67543ee35ed1086ec36400c6
 *                   userId:
 *                     type: string
 *                     example: 67543ee35ed1086ec36400c6
 *                   postId:
 *                     type: string
 *                     example: 67543ee35ed1086ec36400c6
 *                   text:
 *                     type: string
 *                     example: great post
 *                   date:
 *                     type: date
 *                     example: 2024-12-07T12:26:11.003Z
 *       400:
 *         description: problem fetching comments 
 */
commentRouter.get('/post/:postid', commentController.CommentsByPostId.bind(commentController));

/**
 * @swagger
 * /comment/update:
 *   put:
 *     description: update a comment
 *     parameters:
 *       - name: id
 *         in: body
 *         description: The comment id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67543ee35ed1086ec36400c6
 *     responses:
 *       200:
 *         description: sucsses updating comment
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: update entity sucssfully
 *       400:
 *         description: problem updating comment 
 */
commentRouter.put('/update', commentController.update.bind(commentController));
