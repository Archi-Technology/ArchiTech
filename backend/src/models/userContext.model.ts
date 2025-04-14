import mongoose, { Document, Schema } from 'mongoose';

export interface IBaseUserContext extends Document {
  descOfProject: string;
  highAvailbility: boolean;
  securityHighConcern: boolean;
  connectDifferentCloudP: boolean;
  amountOfUsers: string;
  budget: string;
  regulations: string;
}

export interface IUserContext extends IBaseUserContext {
  userId: mongoose.Types.ObjectId;
}

const UserContextSchema = new Schema<IUserContext>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', index: true, unique: true },
  descOfProject: { type: String },
  amountOfUsers: { type: String },
  regulations: { type: String },
  budget: { type: String },
  connectDifferentCloudP: { type: Boolean },
  securityHighConcern: { type: Boolean },
  highAvailbility: { type: Boolean },
});


const UserContextModel = mongoose.model<IUserContext>('UserContext', UserContextSchema);

export default UserContextModel;
