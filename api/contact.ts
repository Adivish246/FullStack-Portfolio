import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertContactMessageSchema } from '@shared/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        const messages = await storage.getContactMessages();
        return res.json(messages);

      case 'POST':
        const validation = insertContactMessageSchema.safeParse(req.body);
        if (!validation.success) {
          return res.status(400).json({ 
            error: 'Invalid contact message data',
            details: validation.error.format()
          });
        }
        const newMessage = await storage.createContactMessage(validation.data);
        return res.status(201).json(newMessage);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 