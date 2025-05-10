import { Schema, model, Document, Types } from 'mongoose';

export interface IProject extends Document {
  userId: Types.ObjectId;
  name: string;
  lastEdited?: Date;
  data?: Record<string, any>;
}

const ProjectSchema = new Schema<IProject>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    lastEdited: { type: Date, default: Date.now },
    data: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
);

export const ProjectModel = model<IProject>('Project', ProjectSchema);
