import mongoose from "mongoose";
import { IResource, ResourceModel } from "../models/resource.model";
import { CloudProvider, ServiceType } from "../types/enums/service";
import { BaseService } from "./base.service";

interface ResourceDistributionByProvider {
  [provider: string]: number;
}

interface ResourceDistributionByType {
  storage: number;
  compute: number;
  network: number;
}

interface ResourceDistributionByRegion {
  [region: string]: { count: number; percent: number };
}

export class DashboardService {
  private resourceBaseService: BaseService<IResource>;

  constructor() {
    this.resourceBaseService = new BaseService(ResourceModel);
  }

  // Distribution of all resources per project by cloud provider (percentage)
  async getResourceDistributionByProvider(projectId: string): Promise<ResourceDistributionByProvider> {
    const resources = await this.resourceBaseService.getByFilter({ projectId });
    const total = resources.length;
    const distribution: ResourceDistributionByProvider = {};

    // Initialize all providers to 0
    Object.values(CloudProvider).forEach(provider => {
      distribution[provider] = 0;
    });

    resources.forEach(resource => {
      const provider = resource.cloudProvider || "Unknown";
      if (distribution[provider] !== undefined) {
        distribution[provider] += 1;
      }
    });

    // Convert to percentage
    Object.keys(distribution).forEach(provider => {
      distribution[provider] = total > 0 ? Number(((distribution[provider] / total) * 100).toFixed(2)) : 0;
    });

    return distribution;
  }

  // Resource Distribution by type (percentage)
  async getResourceDistributionByType(projectId: string): Promise<ResourceDistributionByType> {
    const resources = await this.resourceBaseService.getByFilter({ projectId });
    const total = resources.length;
    const distribution: ResourceDistributionByType = {
      storage: 0,
      compute: 0,
      network: 0,
    };

    resources.forEach(resource => {
      if (resource.type === ServiceType.OBJECT_STORAGE) {
        distribution.storage += 1;
      } else if (
        resource.type === ServiceType.VM ||
        resource.type === ServiceType.DATABASE
      ) {
        distribution.compute += 1;
      } else if (
        resource.type === ServiceType.LB ||
        resource.type === ServiceType.VPC ||
        resource.type === ServiceType.SUBNET
      ) {
        distribution.network += 1;
      }
    });

    // Convert to percentage
    (Object.keys(distribution) as (keyof ResourceDistributionByType)[]).forEach(type => {
      distribution[type] = total > 0 ? Number(((distribution[type] / total) * 100).toFixed(2)) : 0;
    });

    return distribution;
  }

  // Calculation of total price per cloud provider and total cost (price is per hour, return per month)
  async getTotalPrice(projectId: string): Promise<{ [provider: string]: number; total: number }> {
    // Exclude OBJECT_STORAGE resources
    const resources = await this.resourceBaseService.getByFilter({
      projectId,
      type: { $ne: ServiceType.OBJECT_STORAGE }
    });

    // 1 month = 730 hours (average)
    const HOURS_IN_MONTH = 730;

    // Initialize all providers to 0
    const perProvider: { [provider: string]: number } = {};
    Object.values(CloudProvider).forEach(provider => {
      perProvider[provider] = 0;
    });

    let total = 0;

    resources.forEach(resource => {
      const provider = resource.cloudProvider || "Unknown";
      const pricePerHour = Number(resource.extraData?.pricing) || 0;
      const pricePerMonth = pricePerHour * HOURS_IN_MONTH;

      if (perProvider[provider] !== undefined) {
        perProvider[provider] += pricePerMonth;
      }
      total += pricePerMonth;
    });

    // Round to 2 decimals
    Object.keys(perProvider).forEach(provider => {
      perProvider[provider] = Number(perProvider[provider].toFixed(2));
    });

    return {
      ...perProvider,
      total: Number(total.toFixed(2))
    };
  }

  // Resource Distribution by region (percentage)
  async getResourceDistributionByRegion(projectId: string): Promise<ResourceDistributionByRegion> {
    const resources = await this.resourceBaseService.getByFilter({ projectId });
    const total = resources.length;
    const distribution: ResourceDistributionByRegion = {};

    resources.forEach(resource => {
      const region = resource.extraData?.region || "Unknown";
      if (!distribution[region]) {
        distribution[region] = { count: 0, percent: 0 };
      }
      distribution[region].count += 1;
    });

    // Calculate percentages
    Object.keys(distribution).forEach(region => {
      distribution[region].percent = total > 0
        ? Number(((distribution[region].count / total) * 100).toFixed(2))
        : 0;
    });

    return distribution;
  }
}