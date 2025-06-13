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

    async createResource(projectId: string, name: string, type: ServiceType, parentId: string | null, cloudProvider: CloudProvider,): Promise<IResource> {
        const project = new this.resourceBaseService.model({ projectId, name, type, parentId, connectedTo: [], cloudProvider, extraData: {} });
        return await project.save();
      }
}