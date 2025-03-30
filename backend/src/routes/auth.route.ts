import { Router } from "express";
import { authController } from "../controllers/auth.controller";

export const authRouter = Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: registrer user
 *     parameters:
 *       - name: username
 *         in: body
 *         description: The user name
 *         required: true
 *         schema:
 *           type: string
 *           example: ilayhagever   
 *       - name: email
 *         in: body
 *         description: The user email
 *         required: true
 *         schema:
 *           type: string
 *           example: daniel@gmail.com
 *       - name: password
 *         in: body
 *         description: The user password
 *         required: true
 *         schema:
 *           type: string
 *           example: 123456   
 *     responses:
 *       201:
 *         description: user created
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
 *       400:
 *         description: problem creating user 
 */
authRouter.post('/register',authController.register.bind(authController));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: user login
 *     parameters:
 *       - name: username
 *         in: body
 *         description: The user name
 *         required: true
 *         schema:
 *           type: string
 *           example: ilayhagever   
 *       - name: password
 *         in: body
 *         description: The user password
 *         required: true
 *         schema:
 *           type: string
 *           example: 123456   
 *     responses:
 *       200:
 *         description: sucsses login
*         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acssesToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzNDUwY2M3NDc2OWI1NTZlNDdkNjMiLCJpYXQiOjE3MzM1MTA0NTUsImV4cCI6MTczMzU0NjQ1NX0.jO3FokENigSM6IsaagxKrDMwNd8IhuoJr5fXZtMpwus
 *                 refreshToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzNDUwY2M3NDc2OWI1NTZlNDdkNjMiLCJpYXQiOjE3MzM1MTA0NTUsImV4cCI6MTczMzU0NjQ1NX0.jO3FokENigSM6IsaagxKrDMwNd8IhuoJr5fXZtMpwus
 *       400:
 *         description: problem logging user 
 */

authRouter.post('/login',authController.login.bind(authController));


authRouter.post('/login/google',authController.googleSignin.bind(authController));

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     description: user logout
 *     parameters:
 *       - name: refresh token
 *         in: header
 *         description: The refresh token
 *         required: true
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzNDUwY2M3NDc2OWI1NTZlNDdkNjMiLCJpYXQiOjE3MzM1MTA0NTUsImV4cCI6MTczMzU0NjQ1NX0.jO3FokENigSM6IsaagxKrDMwNd8IhuoJr5fXZtMpwus   
 *     responses:
 *       200:
 *         description: sucsses refresh
 *       400:
 *         description: problem logging out
 */
authRouter.post('/logout',authController.logout.bind(authController));


/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     description: user refersh tokens
 *     parameters:
 *       - name: refresh token
 *         in: header
 *         description: The refresh token
 *         required: true
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzNDUwY2M3NDc2OWI1NTZlNDdkNjMiLCJpYXQiOjE3MzM1MTA0NTUsImV4cCI6MTczMzU0NjQ1NX0.jO3FokENigSM6IsaagxKrDMwNd8IhuoJr5fXZtMpwus   
 *     responses:
 *       200:
 *         description: sucsses refresh
*         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acssesToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzNDUwY2M3NDc2OWI1NTZlNDdkNjMiLCJpYXQiOjE3MzM1MTA0NTUsImV4cCI6MTczMzU0NjQ1NX0.jO3FokENigSM6IsaagxKrDMwNd8IhuoJr5fXZtMpwus
 *                 refreshToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzUzNDUwY2M3NDc2OWI1NTZlNDdkNjMiLCJpYXQiOjE3MzM1MTA0NTUsImV4cCI6MTczMzU0NjQ1NX0.jO3FokENigSM6IsaagxKrDMwNd8IhuoJr5fXZtMpwus
 *       400:
 *         description: problem refreshing tokens 
 */
authRouter.post('/refresh',authController.refresh.bind(authController));



