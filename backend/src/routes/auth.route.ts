import { Router } from "express";
import { authController } from "../controllers/auth.controller";

export const authRouter = Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: securepassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Registration failed
 */
authRouter.post('/register',authController.register.bind(authController));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Login a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: securepassword123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refreshToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Login failed
 */
authRouter.post('/login',authController.login.bind(authController));

/**
 * @swagger
 * /auth/login/google:
 *   post:
 *     description: Login a user using Google OAuth
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *                 example: eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2MzQ2NzAifQ...
 *     responses:
 *       200:
 *         description: User logged in successfully using Google
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refreshToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Google login failed
 */
authRouter.post('/login/google',authController.googleSignin.bind(authController));

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     description: Logout a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       400:
 *         description: Logout failed
 */
authRouter.post('/logout',authController.logout.bind(authController));


/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     description: Refresh access token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Token refresh failed
 */
authRouter.post('/refresh',authController.refresh.bind(authController));



