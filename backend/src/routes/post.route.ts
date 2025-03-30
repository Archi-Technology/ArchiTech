import { Router } from "express";
import { postController } from "../controllers/post.controller";

export const postRouter = Router();
/**
 * @swagger
 * /post/:postid/like:
 *   post:
 *     description: like a post
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
 *         description: sucsses like
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: update entity sucssfully
 *       400:
 *         description: problem creating comment 
 */
postRouter.post('/:postid/like', postController.like.bind(postController));

/**
 * @swagger
 * /post/:postid/unlike:
 *   post:
 *     description: unlike a post
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
 *         description: sucsses unlike
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: update entity sucssfully
 *       400:
 *         description: problem creating comment 
 */
postRouter.post('/:postid/unlike', postController.unlike.bind(postController));

/**
 * @swagger
 * /post/:id:
 *   delete:
 *     description: delete a post by id
 *     parameters:
 *       - name: id
 *         in: params
 *         description: The post id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67543ee35ed1086ec36400c6
 *     responses:
 *       200:
 *         description: sucsses deleting post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isDeleted:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: problem deleting post 
 */
postRouter.delete('/:id', postController.deleteById.bind(postController));

/**
 * @swagger
 * /post/create:
 *   post:
 *     description: create a new post
 *     parameters:
 *       - name: text
 *         in: body
 *         description: The comment text
 *         required: true
 *         schema:
 *           type: string
 *           example: hello
 *       - name: image
 *         in: body
 *         description: The post image
 *         required: true
 *         schema:
 *           type: string
 *           example: test.png
 *     responses:
 *       200:
 *         description: sucsses creating post
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: create entity sucssfully
 *       400:
 *         description: problem creating post 
 */
postRouter.post('/create', postController.create.bind(postController));
postRouter.post('/create/ai', postController.createPostGeneratedByAI.bind(postController));

  
/**
 * @swagger
 * /post/all:
 *   get:
 *     description: fetch all posts in the system
 *     responses:
 *       200:
 *         description: sucsses fetching all posts
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
 *                   date:
 *                     type: date
 *                     example: 2024-12-07T12:26:11.003Z
 *                   image:
 *                     type: string
 *                     example: img.png
 *                   likes:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: 67543ee35ed1086ec36400c6
 *       400:
 *         description: problem fetching all posts 
 */
postRouter.get('/all', postController.allPosts.bind(postController));

/**
 * @swagger
 * /post/update:
 *   put:
 *     description: update a post
 *     parameters:
 *       - name: id
 *         in: body
 *         description: The post id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67543ee35ed1086ec36400c6
 *     responses:
 *       200:
 *         description: sucsses updating post
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: update entity sucssfully
 *       400:
 *         description: problem updating post 
 */
postRouter.put('/update', postController.update.bind(postController));
