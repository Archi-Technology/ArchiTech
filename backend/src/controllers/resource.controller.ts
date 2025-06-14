import { Request, Response } from 'express';
import { ResourceService } from '../services/resource.service';
import { exractUserIdFromToken } from '../utils/user.util';

class ResourceController {
  private service: ResourceService;

  constructor() {
    this.service = new ResourceService();
  }



  async create(req: Request, res: Response) {
    try {
      const userId = exractUserIdFromToken(req);
      const { name, projectId, cloudProvider,  type,  parentId, } = req.body;

      if (!name) throw new Error('Missing project name');

      const created = await this.service.createResource(projectId, name, type, parentId, cloudProvider,);
      if (!created) throw new Error('failed to create resource');
      res.status(201).json(created);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
 

export const resourceController = new ResourceController();
