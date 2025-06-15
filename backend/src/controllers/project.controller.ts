// src/controllers/project.controller.ts
import { Request, Response } from 'express';
import { ProjectService } from '../services/project.service';
import { ProjectModel } from '../models/project.model';
import { exractUserIdFromToken } from '../utils/user.util';

class ProjectController {
  private service: ProjectService;

  constructor() {
    this.service = new ProjectService(ProjectModel);
  }

  async getAll(req: Request, res: Response) {
    try {
      const userId = exractUserIdFromToken(req);
      const projects = await this.service.getAllByUser(userId);
      res.json(projects);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getProjectArtchitecture(req: Request, res: Response) {
    try {
      const data = await this.service.getProjectArtchitecture(req.params.id);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const userId = exractUserIdFromToken(req);
      const { name, data } = req.body;

      if (!name) throw new Error('Missing project name');

      const created = await this.service.createProject(userId, name, data);
      res.status(201).json(created);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = exractUserIdFromToken(req);
      const { id } = req.params;
      const { name, data } = req.body;

      const updated = await this.service.updateProject(userId, id, name, data);
      if (!updated) throw new Error('Project not found');

      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userId = exractUserIdFromToken(req);
      const { id } = req.params;

      const deleted = await this.service.deleteProject(userId, id);
      if (!deleted) throw new Error('Project not found');

      res.json({ message: 'Project deleted' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const projectController = new ProjectController();
