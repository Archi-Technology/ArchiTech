import OpenAI from "openai";
import { config } from "../config/config";
const fs = require('fs');
const path = require('path');


export const openai = new OpenAI({
    apiKey: config.OPEN_AI_KEY
});

export const subjectsForPost = ['Paris', 'Rome','New York City','Tokyo','Sydney','London','Barcelona','Dubai','phuket','tel aviv',"madrid", 'chile', "maldives"]
export const generateDescForPostWithAi = async(subject: string) => {
 // return 'heiiiiiiiiiiiii'
  const prompt = `Write a description in 10 words about the destination ${subject} that will be look likes a post description in instagram, with the name of the destination`;
  const response: any = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // Or use gpt-4 if you have access
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 100,
});

  return  response.choices[0].message.content;
};

export const generatePostWithAi = async(subject: string) => {
   //return `iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAAAimVYSWZNTQAqAAAACAACknwAAgAAAC0AAAAmkoYAAQAAADYAAABUAAAAAE9wZW5BSS0tcmVxXzVjYmFmMjJkMWE2ZGFmYjE4MGM4ZTEzMDU4OWYxNjkwAABVTklDT0RFAE0AYQBkAGUAIAB3AGkAdABoACAATwBwAGUAbgBBAEkAIABEAEEATABMAC0ARQBPm3sHAAEAAElEQVR4AQAWhOl7Aano3v//AgEB////AAAAAQIB/wABAf//AAIAAf8A/wAAAAD/AAADAQH9//8AAQABAAEB/wIAAv4AAAD/AAAB/wAAAAL//v8BA////gABAwH//QIAAv8B/wAAAQAA/wEBAQEA/wH/Af4AAQH///8B/wIAAf8AAP4AAAL//wIBAf7/AgIA/wEDAv//AAAA/wAAAQEA//8AAAEB/wH+AAAA//8AAv//AAACAgAA//8A/wE…AAAP//AQEB/gABAf//AAAA/wD/AP//AAAA////AAH/AP8A/wABAAAA/v4AAAEBAP//AAD///8A/wAAAf4AAQH/AAEAAP8BAP8A/gACAQL//v4AAgABAAH/AQABAP8B/gH/AQABAAABAQH//wEAAv7//wEBAQUAA/4BAQD//gADAQH///8AAQIBAQD//QAABP7//wIBAAD/AQEB/f/+AQIF//78AAH//v7//v4BAv/9/wEAAgMA/QAC//8AAgABAf0B/wAA/wH+/wACAAIDAP/9AAEBAgAA/v4AAf8B/v/+AQEBAAADAAD+/gMCAP3+/gAAAAABAAAAAgABAAH//v8AAQEC/gD/AAAB/wIA/wAAAAH//wAAAAEBAAAB//8AAAH/Af8D/gD///4AAAEAAAAB/gAAAP8CAP/+/AH/AP4BAAEA/wAB/wAA/wD/AgAA/gEA//4B/wH///7//wL/AAD/friFk6EWbjkAAAAASUVORK5CYII=`
  const prompt = `Generate image of the  destination: ${subject}`;
  const response: any = await openai.images.generate({
    prompt,
    n: 1, 
    size: '512x512',
    response_format: 'b64_json'
  });

  return response.data[0].b64_json
};



export const downloadBase64Image = async (base64Image: string, fileName: string) => {
  try {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const fullFolderPath = path.resolve(__dirname, '../config/uploads');
    if (!fs.existsSync(fullFolderPath)) {
      fs.mkdirSync(fullFolderPath, { recursive: true });
    }

    const filePath = path.join(fullFolderPath, fileName);
    fs.writeFileSync(filePath, buffer);
    console.log('Image saved at: ' + filePath);
  } catch (error) {
    console.error('Error saving base64 image:', error);
  }
}