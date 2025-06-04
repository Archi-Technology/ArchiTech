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
      const { name, projectId, cloudProvider,  type,  parentId, extraData} = req.body;
      console.log('Creating resource with data:', req.body);

      if (!name) throw new Error('Missing project name');

      const data = await this.service.createResource(projectId, name, type, parentId || null, cloudProvider,extraData);
      if (!data) throw new Error('failed to create resource');
      res.status(201).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

}
 

export const resourceController = new ResourceController();
