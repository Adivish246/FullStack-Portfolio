import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
  // Projects endpoints
  app.get("/api/projects", async (_req: Request, res: Response) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }
      
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req: Request, res: Response) => {
    try {
      const validation = insertProjectSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid project data", 
          details: validation.error.format() 
        });
      }
      
      const project = await storage.createProject(validation.data);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.put("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }
      
      // Validate only the fields that are being updated
      const partialProjectSchema = insertProjectSchema.partial();
      const validation = partialProjectSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid project data", 
          details: validation.error.format() 
        });
      }
      
      const project = await storage.updateProject(id, validation.data);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }
      
      const success = await storage.deleteProject(id);
      if (!success) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Contact message endpoints
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validation = insertContactMessageSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid contact message data", 
          details: validation.error.format() 
        });
      }
      
      const message = await storage.createContactMessage(validation.data);
      res.status(201).json(message);
    } catch (error) {
      console.error("Error creating contact message:", error);
      res.status(500).json({ error: "Failed to create contact message" });
    }
  });

  app.get("/api/contact", async (_req: Request, res: Response) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ error: "Failed to fetch contact messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
