import cors from 'cors';
import dotenv from 'dotenv';
import * as express from 'express';
import { Application } from 'express';
import mongoose from 'mongoose';
import path from "path";
import fs from 'fs';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/config';
import { uploadMiddleware } from './config/multer';
import { authMiddleware } from './middlewares/authMiddleware';
import { authRouter } from './routes/auth.route';
import { commentRouter } from './routes/comment.route';
import { postRouter } from './routes/post.route';
import { userRouter } from './routes/user.route';
import './cron-jobs/generateAiPosts'
import { chatRouter } from './routes/chat.route';


const appPromise: Promise<Application> = new Promise( async (resolve, reject) => {

    const app = express();

    app.use(express.json());

    if (process.env.NODE_ENV == 'test') {
        dotenv.config({ path: '../.test.env' })
    } else {
        dotenv.config()
    }

    const uploadsPath = path.join(__dirname, "config/uploads");
    if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath, { recursive: true });
    }

    app.use("/api/uploads", express.static(uploadsPath));
    
    app.use(uploadMiddleware);
    app.use(cors());

    app.use('/api', authMiddleware);

    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/comment', commentRouter); 
    app.use('/api/post', postRouter);
    app.use('/api/chat', chatRouter);


    try {
        await mongoose.connect(config.MONGO_URI as string);
        console.log('MongoDB connected');
      } catch (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
      }
      mongoose.set('bufferCommands', false);
    const swaggerOptions: swaggerJSDoc.Options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Express API with Swagger',
                version: '1.0.0',
                description: 'This is a simple Express API with Swagger documentation.',
            },
        },
        apis: ['./src/routes/*.ts'],
    };

    const swaggerSpec = swaggerJSDoc(swaggerOptions);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    resolve(app)

})

export default appPromise


