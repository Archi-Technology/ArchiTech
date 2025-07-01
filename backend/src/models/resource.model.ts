import { Schema, model, Document, Types } from 'mongoose';
import { CloudProvider, ServiceType } from '../types/enums/service';

export interface IResource extends Document {
  projectId: Types.ObjectId;
  name: string;
  type: ServiceType;
  parentId: Types.ObjectId | null;
  connectedTo: string[];
  cloudProvider: CloudProvider;
  extraData: any;
}


const RosourceSchema = new Schema<IResource>( 
    {
        projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
        type: { type: String, required: true },
        name: { type: String, required: true },
        parentId: { type:  Schema.Types.ObjectId, ref: 'Project', null: true },
        cloudProvider: { type: String, required: true },
        connectedTo: { type: [String], required: true },
        extraData: { type: Schema.Types.Mixed, required: true },
      }
    
);

export const ResourceModel = model<IResource>("resource", RosourceSchema);

