import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertProjectSchema } from '../shared/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          const project = await storage.getProject(Number(req.query.id));
          if (!project) {
            return res.status(404).json({ error: 'Project not found' });
          }
          return res.json(project);
        }
        const projects = await storage.getProjects();
        return res.json(projects);

      case 'POST':
        const validation = insertProjectSchema.safeParse(req.body);
        if (!validation.success) {
          return res.status(400).json({ 
            error: 'Invalid project data',
            details: validation.error.format()
          });
        }
        const newProject = await storage.createProject(validation.data);
        return res.status(201).json(newProject);

      case 'PUT':
        if (!req.query.id) {
          return res.status(400).json({ error: 'Project ID is required' });
        }
        const updatedProject = await storage.updateProject(Number(req.query.id), req.body);
        if (!updatedProject) {
          return res.status(404).json({ error: 'Project not found' });
        }
        return res.json(updatedProject);

      case 'DELETE':
        if (!req.query.id) {
          return res.status(400).json({ error: 'Project ID is required' });
        }
        const success = await storage.deleteProject(Number(req.query.id));
        if (!success) {
          return res.status(404).json({ error: 'Project not found' });
        }
        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 