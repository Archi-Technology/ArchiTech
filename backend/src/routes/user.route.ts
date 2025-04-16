import { Router } from "express";
import { userController } from "../controllers/user.controller";

export const userRouter = Router();
/**
 * @swagger
 * /user/:userid/posts:
 *   get:
 *     description: get all user posts
 *     parameters:
 *       - name: userid
 *         in: params
 *         description: The user id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67543ee35ed1086ec36400c6
 *     responses:
 *       200:
 *         description: sucsses fetching all user posts
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
userRouter.get('/:userid/posts', userController.getUserPosts.bind(userController));

/**
 * @swagger
 * /user/data:
 *   get:
 *     description: fetch user data
 *     responses:
 *       200:
 *         description: sucsses fetching user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 67543ee35ed1086ec36400c6
 *                 password:
 *                   type: string
 *                   example: $2a$10$Gkh.cvbF9SV0EZqMo.URU.Fzn4y15NkheCuRM4fyqxf5xT50PWqCC
 *                 username:
 *                   type: string
 *                   example: testuser
 *                 email:
 *                   type: string
 *                   example: testuser@gmail.com
 *                 image:
 *                   type: string
 *                   example: img.png
 *                 tokens:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzNDUwY2M3NDc2OWI1NTZlNDdkNjMiLCJpYXQiOjE3MzM1NzQxMDYsImV4cCI6MTczMzYxMDEwNn0.I5dR3pdSSadHUGhflKa4GG8-fqDGo_O7_i5sWPEY0Tg"
 *       400:
 *         description: problem fetching all posts 
 */
userRouter.get('/data', userController.userData.bind(userController));

/**
 * @swagger
 * /user/update:
 *   put:
 *     description: update a user
 *     parameters:
 *       - name: username
 *         in: body
 *         description: The username to update
 *         required: false
 *         schema:
 *           type: string
 *           example: newtestusername
 *       - name: image
 *         in: body
 *         description: The image to update
 *         required: false
 *         schema:
 *           type: string
 *           example: newimg.png
 *     responses:
 *       200:
 *         description: sucsses updating user
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: update entity sucssfully
 *       400:
 *         description: problem updating user 
 */
userRouter.put('/update', userController.updateUser.bind(userController));

/**
 * @swagger
 * /user/create:
 *   post:
 *     description: create a new user
 *     parameters:
 *       - name: username
 *         in: body
 *         description: The username
 *         required: true
 *         schema:
 *           type: string
 *           example: username
 *       - name: image
 *         in: body
 *         description: The image 
 *         required: true
 *         schema:
 *           type: string
 *           example: img.png
 *       - name: email
 *         in: body
 *         description: The email
 *         required: true
 *         schema:
 *           type: string
 *           example: newuser@gmail.com
 *     responses:
 *       200:
 *         description: sucsses creating user
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: creating entity sucssfully
 *       400:
 *         description: problem creating user 
 */
userRouter.post('/create', userController.create.bind(userController));
userRouter.post('/context/create', userController.saveUserContext.bind(userController));
userRouter.get('/context/check', userController.checkUserContext.bind(userController));


/**
 * @swagger
 * /user/:id:
 *   delete:
 *     description: delete a user by id
 *     parameters:
 *       - name: id
 *         in: params
 *         description: The user id
 *         required: true
 *         schema:
 *           type: string
 *           example: 67543ee35ed1086ec36400c6
 *     responses:
 *       200:
 *         description: sucsses deleting user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isDeleted:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: problem deleting user 
 */
userRouter.delete('/:id', userController.deleteById.bind(userController));


/**
 * @swagger
 * /user/detials/:id:
 *   get:
 *     description: fetch user data by id
 *     responses:
 *       200:
 *         description: sucsses fetching user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 67543ee35ed1086ec36400c6
 *                 password:
 *                   type: string
 *                   example: $2a$10$Gkh.cvbF9SV0EZqMo.URU.Fzn4y15NkheCuRM4fyqxf5xT50PWqCC
 *                 username:
 *                   type: string
 *                   example: testuser
 *                 email:
 *                   type: string
 *                   example: testuser@gmail.com
 *                 image:
 *                   type: string
 *                   example: img.png
 *                 tokens:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzNDUwY2M3NDc2OWI1NTZlNDdkNjMiLCJpYXQiOjE3MzM1NzQxMDYsImV4cCI6MTczMzYxMDEwNn0.I5dR3pdSSadHUGhflKa4GG8-fqDGo_O7_i5sWPEY0Tg"
 *       400:
 *         description: problem fetching all posts 
 */
userRouter.get('/details/:id', userController.userDetials.bind(userController));

