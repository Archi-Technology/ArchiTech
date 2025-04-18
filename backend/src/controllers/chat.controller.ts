import OpenAI from 'openai';
import { Request, Response } from 'express';
import UserContextModel from '../models/userContext.model';
import mongoose from 'mongoose';
import { exractUserIdFromToken } from '../utils/user.util';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const chatHistory: Record<string, ChatMessage[]> = {};

class ChatController {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async askQuestion(req: Request, res: Response) {
    const { question } = req.body;
    const userId = exractUserIdFromToken(req);

    try {
      if (!question || !userId) {
        throw new Error('no question or userId provided');
      }

      if (!chatHistory[userId]) {
        chatHistory[userId] = [
          { role: 'system', content: 'You are a knowledgeable and concise assistant specializing in DevOps architecture and management. Provide clear, accurate, and helpful responses to assist users effectively.' },        ];
      }
      
      const userContext = await UserContextModel.findOne({ userId: new mongoose.Types.ObjectId(userId) }).exec();

      const hasLoadedUserContext = chatHistory[userId].some(msg => 
        msg.role === 'system' && msg.content.includes('[context marker]')
      );
      
      if (!hasLoadedUserContext && userContext) {
          const summary = `
            [context marker] Project Description: ${userContext.descOfProject || 'N/A'}
            Amount of Users: ${userContext.amountOfUsers || 'N/A'}
            Budget: ${userContext.budget || 'N/A'}
            Regulations: ${userContext.regulations || 'N/A'}
            High Availability: ${userContext.highAvailbility ? 'Yes' : 'No'}
            Security Concerns: ${userContext.securityHighConcern ? 'Yes' : 'No'}
            Multi-cloud Requirement: ${userContext.connectDifferentCloudP ? 'Yes' : 'No'}
          `.trim();
          chatHistory[userId].push({
            role: 'system',
            content: summary,
          });
      }
      
      chatHistory[userId].push({ role: 'user', content: question });

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: chatHistory[userId],
      });

      const answer = response.choices[0].message?.content || 'No answer returned.';

      chatHistory[userId].push({ role: 'assistant', content: answer });

      res.status(200).json({message: answer});

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const chatController = new ChatController();
