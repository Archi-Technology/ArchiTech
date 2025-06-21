import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller';

export const dashboardRouter = Router();

dashboardRouter.get(
  '/provider-distribution/:projectId',
  dashboardController.getResourceDistributionByProvider.bind(dashboardController)
);

dashboardRouter.get(
  '/type-distribution/:projectId',
  dashboardController.getResourceDistributionByType.bind(dashboardController)
);

dashboardRouter.get(
  '/total-price/:projectId',
  dashboardController.getTotalPrice.bind(dashboardController)
);

dashboardRouter.get(
  '/region-distribution/:projectId',
  dashboardController.getResourceDistributionByRegion.bind(dashboardController)
);