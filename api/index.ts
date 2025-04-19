import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import cors from 'cors';
import { json } from 'express';

// Middleware handler
const runMiddleware = (req: VercelRequest, res: VercelResponse, fn: Function) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Run the middleware
    await runMiddleware(req, res, cors());
    await runMiddleware(req, res, json());

    try {
        // Handle different routes based on the path
        const path = req.url?.split('?')[0];

        switch (path) {
            case '/api/projects':
                if (req.method === 'GET') {
                    const projects = await storage.getProjects();
                    return res.json(projects);
                }
                break;

            case '/api/contact':
                if (req.method === 'GET') {
                    const messages = await storage.getContactMessages();
                    return res.json(messages);
                }
                break;
        }

        // If no route matches
        return res.status(404).json({ error: 'Route not found' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
} 