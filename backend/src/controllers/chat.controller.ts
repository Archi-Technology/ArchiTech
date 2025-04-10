import OpenAI from 'openai';
import { Request, Response } from 'express';

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
    console.log('askQuestion', req.body);
    const { question, userId } = req.body;
    console.log('question', question);

    try {
      if (!question || !userId) {
        throw new Error('no question or userId provided');
      }

      if (!chatHistory[userId]) {
        chatHistory[userId] = [
          { role: 'system', content: 'You are a helpful assistant for a medical app. Respond concisely and clearly.' },
        ];
      }

      chatHistory[userId].push({ role: 'user', content: question });

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: chatHistory[userId],
      });

      const answer = response.choices[0].message?.content || 'No answer returned.';
      
      chatHistory[userId].push({ role: 'assistant', content: answer });

      res.status(200).json(answer);

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const chatController = new ChatController();
