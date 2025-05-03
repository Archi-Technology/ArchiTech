import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Application } from "express";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { config } from "./config/config";
import { authMiddleware } from "./middlewares/authMiddleware";
import { chatRouter } from "./routes/chat.route";
import { azureRouter } from "./routes/azure.route";

const appPromise: Promise<Application> = new Promise(
  async (resolve, reject) => {
    const app = express();

    app.use(express.json());

    if (process.env.NODE_ENV == "test") {
      dotenv.config({ path: "../.test.env" });
    } else {
      dotenv.config();
    }

    const uploadsPath = path.join(__dirname, "config/uploads");
    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath, { recursive: true });
    }

    app.use(cors());

    app.use("/api", authMiddleware);

    app.use("/api/chat", chatRouter);
    app.use("/azure", azureRouter);

    try {
      await mongoose.connect(config.MONGO_URI as string);
      console.log("MongoDB connected");
    } catch (err) {
      console.error("MongoDB connection failed:", err);
      process.exit(1);
    }
    mongoose.set("bufferCommands", false);
    const swaggerOptions: swaggerJSDoc.Options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Express API with Swagger",
          version: "1.0.0",
          description:
            "This is a simple Express API with Swagger documentation.",
        },
      },
      apis: ["./src/routes/*.ts"],
    };

    const swaggerSpec = swaggerJSDoc(swaggerOptions);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    resolve(app);
  }
);

export default appPromise;
