import { Request, Response } from "express";
import UserContextModel from "../models/userContext.model";
import mongoose from "mongoose";
import { exractUserIdFromToken } from "../utils/user.util";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

const chatHistory: Record<string, ChatMessage[]> = {};

class ChatController {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  }
  async getUserContext(req: Request, res: Response) {
    try {
      const userId = exractUserIdFromToken(req);
      if (!userId) {
        return res.status(400).json({ message: "No userId provided" });
      }
      const userContext = await UserContextModel.findOne({
        userId: new mongoose.Types.ObjectId(userId),
      }).exec();
      if (!userContext) {
        return res.status(404).json({ message: "User context not found" });
      }
      res.status(200).json(userContext);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async askQuestion(req: Request, res: Response) {
    const { question } = req.body;
    const userId = exractUserIdFromToken(req);

    try {
      if (!question || !userId) {
        throw new Error("No question or userId provided");
      }

      // Initialize chat history for the user if it doesn't exist
      if (!chatHistory[userId]) {
        chatHistory[userId] = [
          {
            role: "user",
            content:
              "Hi! From now on, act as a knowledgeable and concise assistant specializing in DevOps architecture and management. Provide clear, accurate, and helpful responses to assist users effectively. if the users requests a json response, pleaserespond with a json object only and nothing else.",
          },
        ];
      }

      // Fetch the user context from the DB
      const userContext = await UserContextModel.findOne({
        userId: new mongoose.Types.ObjectId(userId),
      }).exec();

      // Compose the final message with context embedded
      let finalQuestion = question;

      if (userContext) {
        const contextSummary = `
Context:
Project's main purpose: ${userContext.mainPurpose || "N/A"}
Resources demands: ${userContext.resourceDemands || "N/A"}
Main users location: ${userContext.regions || "N/A"}
Os dependecies: ${userContext.osDependencies || "N/A"}
Software dependencies: ${userContext.softwareDependencies || "N/A"}
Budget considerations: ${userContext.budgetConsiderations || "N/A"}
General Description: ${userContext.generalDescription || "N/A"}

Question:
${question}

        `.trim();
        // Fallback:
        // If the user context is not sufficient to answer the question, please response with the following json: {message:Your context lack details for me to suggest.}.
        finalQuestion = contextSummary;
      }

      // Add the full final question to chat history
      chatHistory[userId].push({ role: "user", content: finalQuestion });

      // Convert to Gemini-compatible format
      const formattedHistory = chatHistory[userId].map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));

      // Create chat instance
      const model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-flash", // or gemini-1.5-pro-latest
      });

      const chat = model.startChat({
        history: formattedHistory,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ],
      });

      // Ask the model the current question
      const result = await chat.sendMessage(finalQuestion);
      const answer = result.response.text() || "No answer returned.";

      // Store the assistant's reply
      chatHistory[userId].push({ role: "model", content: answer });

      res.status(200).json({ message: answer });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const chatController = new ChatController();
