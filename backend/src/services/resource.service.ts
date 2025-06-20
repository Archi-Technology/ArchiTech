import mongoose from "mongoose";
import { IResource, ResourceModel } from "../models/resource.model";
import { CloudProvider, ServiceType } from "../types/enums/service";
import { BaseService } from "./base.service";

export class ResourceService extends BaseService<IResource> {
    private resourceBaseService: BaseService<IResource>;
  
  constructor() {
    super(ResourceModel);
    this.resourceBaseService = new BaseService(ResourceModel);

  }

    async getAllByProject(projectId: string): Promise<IResource[]> {
        return await this.resourceBaseService.getByFilter({ projectId });
    }

    async getById(resourceId: string): Promise<IResource> {
      return await this.resourceBaseService.getById(resourceId);
  }

  async getVpcAndSubnetOfResourceId(resourceId: string): Promise<IVpcAndSubnet> {
    const resource = await this.resourceBaseService.getById(resourceId);
    if (!resource) throw new Error('Resource not found');
    if (resource.type !== ServiceType.VPC && resource.type !== ServiceType.SUBNET && resource.parentId) {

      const subnet = await this.resourceBaseService.getById(resource.parentId.toString());
      if (!subnet || !subnet.parentId) throw new Error('Subnet not found for the resource');
      const vpc = await this.resourceBaseService.getById(subnet.parentId.toString());

      return {
        vpc: vpc,
        subnet: subnet
      }
    }
    if (resource.type === ServiceType.VPC) {
      return {
        vpc: resource,
        subnet: resource //change if for generate terraform for the
      }
    } else if (resource.type === ServiceType.SUBNET) {
      const vpc = await this.resourceBaseService.getById(resource.parentId!.toString());
      return {
        vpc: vpc,
        subnet: resource
      }
    }
    throw new Error('Resource is neither a VPC nor a Subnet');
}

    async getSubentsByProject(projectId: string): Promise<IResource[]> {
      return await this.resourceBaseService.getByFilter({ projectId, type: ServiceType.SUBNET });
  }

  async getVpcsByProject(projectId: string): Promise<IResource[]> {
    const a = await this.resourceBaseService.getByFilter({projectId: new mongoose.Types.ObjectId(projectId),  type: ServiceType.VPC });
    console.log('VPCs for project:', projectId, a);
    return a
}

    async createResource(projectId: string, name: string, type: ServiceType, parentId: string | null, cloudProvider: CloudProvider, connectedTo: string[],extraData: any = {}): Promise<IResource> {
        const project = new this.resourceBaseService.model({ projectId: new mongoose.Types.ObjectId(projectId), name, type, parentId, connectedTo: connectedTo , cloudProvider, extraData: extraData });
        return await project.save();
      }
}

export interface IVpcAndSubnet {  
  vpc: IResource;  
  subnet: IResource;  
}