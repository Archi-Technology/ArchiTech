import { Model } from 'mongoose';
import { IProject } from '../models/project.model';

export class ProjectService {
  constructor(private model: Model<IProject>) {}

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
