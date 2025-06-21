import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service';

class DashboardController {
  private service: DashboardService;

  constructor() {
    this.service = new DashboardService();
  }

  // GET /dashboard/provider-distribution/:projectId
  async getResourceDistributionByProvider(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      if (!projectId) throw new Error('Missing projectId');
      const data = await this.service.getResourceDistributionByProvider(projectId);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // GET /dashboard/type-distribution/:projectId
  async getResourceDistributionByType(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      if (!projectId) throw new Error('Missing projectId');
      const data = await this.service.getResourceDistributionByType(projectId);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // GET /dashboard/total-price/:projectId
  async getTotalPrice(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      if (!projectId) throw new Error('Missing projectId');
      const data = await this.service.getTotalPrice(projectId);
      res.status(200).json({ totalPrice: data });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // GET /dashboard/region-distribution/:projectId
  async getResourceDistributionByRegion(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      if (!projectId) throw new Error('Missing projectId');
      const data = await this.service.getResourceDistributionByRegion(projectId);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const dashboardController = new DashboardController();