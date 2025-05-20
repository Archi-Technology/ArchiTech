import { Model } from 'mongoose';
import { IProject } from '../models/project.model';
import { ResourceService } from './resource.service';
import { ServiceType } from '../types/enums/service';
import { IResource } from '../models/resource.model';

export class ProjectService {
  private ResourceService: ResourceService; // Placeholder for the resource service, if needed
  constructor(private model: Model<IProject>) {
    this.ResourceService = new ResourceService();
  }

  async getProjectArtchitecture(projectId: string): Promise<IResource[]> {
    return await this.ResourceService.getAllByProject(projectId);
  }

  async getAllByUser(userId: string): Promise<IProject[]> {
    return this.model.find({ userId }).sort({ lastEdited: -1 });
  }

  async createProject(userId: string, name: string, data?: any): Promise<IProject> {
    const project = new this.model({ userId, name, data, lastEdited: new Date() });
    return await project.save();
  }


  async updateProject(userId: string, id: string, name: string, data?: any): Promise<IProject | null> {
    return this.model.findOneAndUpdate(
      { _id: id, userId },
      { name, data, lastEdited: new Date() },
      { new: true }
    );
  }

  async deleteProject(userId: string, id: string): Promise<IProject | null> {
    return this.model.findOneAndDelete({ _id: id, userId });
  }
}





