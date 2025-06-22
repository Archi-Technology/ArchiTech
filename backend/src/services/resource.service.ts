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
        const isFixNeeded = await this.checkIfFixNeeded(cloudProvider, type, parentId);
        if (isFixNeeded && parentId) {
          const defaultVpc = await this.createDefaultVPC(projectId, cloudProvider, {region: extraData.region});
          const defaultSubnet = await this.createDefaultSubnet(projectId, (defaultVpc._id as string).toString() as string, cloudProvider, {region: extraData.region});
          const project = new this.resourceBaseService.model({ 
            projectId: new mongoose.Types.ObjectId(projectId), 
            name, 
            type, 
            parentId: defaultSubnet._id, 
            connectedTo: connectedTo, 
            cloudProvider, 
            extraData: extraData 
          });
          return await project.save();
        } else {
          const project = new this.resourceBaseService.model({ projectId: new mongoose.Types.ObjectId(projectId), name, type, parentId, connectedTo: connectedTo , cloudProvider, extraData: extraData });
          return await project.save();
        }     
      }

      async checkIfFixNeeded (cloudProvider: string, type: ServiceType, parentId: string | null) {
        if(!parentId ) return false

        const parentNode = await this.resourceBaseService.getById(parentId);
        const parentCloud = parentNode?.cloudProvider;
        if (!parentNode || parentCloud !== cloudProvider) {
          return true; // Fix needed if parent node is not found or cloud providers do not match
        } 
        return false; // No fix needed if parent node exists and cloud providers match
      }

      async createDefaultResource(projectId: string, name: string, type: ServiceType, parentId: string | null, cloudProvider: CloudProvider, extraData:any): Promise<IResource> {
        const resource = new this.resourceBaseService.model({ 
          projectId: new mongoose.Types.ObjectId(projectId), 
          name, 
          type, 
          parentId, 
          connectedTo: [], 
          cloudProvider, 
          extraData: extraData
        });
        return await resource.save();
      }

      async createDefaultVPC(projectId: string, cloudProvider: CloudProvider, extraData:any): Promise<IResource> {
        const defaultVpcIfExist = await this.resourceBaseService.getByFilter({ projectId, type: ServiceType.VPC, cloudProvider, name: `${cloudProvider}-defaultVPC` });
        if (defaultVpcIfExist.length > 0) {
          return defaultVpcIfExist[0]; // Return the existing default VPC if it exists
        } 
        return this.createDefaultResource(projectId, `${cloudProvider}-defaultVPC`, ServiceType.VPC, null, cloudProvider, extraData);
      }

      async createDefaultSubnet(projectId: string, vpcId: string, cloudProvider: CloudProvider, extraData:any): Promise<IResource> {
        const defaultSubnetIfExist = await this.resourceBaseService.getByFilter({ projectId, type: ServiceType.SUBNET, cloudProvider, name: `${cloudProvider}-defaultSubnet`, parentId: vpcId });
        if (defaultSubnetIfExist.length > 0) {
          return defaultSubnetIfExist[0]; // Return the existing default Subnet if it exists
        }
        return this.createDefaultResource(projectId, `${cloudProvider}-defaultSubnet`, ServiceType.SUBNET, vpcId, cloudProvider, extraData);
      }


}

export interface IVpcAndSubnet {  
  vpc: IResource;  
  subnet: IResource;  
}