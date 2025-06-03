import mongoose, { Document, Schema } from "mongoose";

export interface IBaseUserContext extends Document {
  mainPurpose: string;
  resourceDemands: string;
  regions: string;
  osDependencies: string;
  softwareDependencies: string;
  budgetConsiderations: string;
  generalDescription?: string;
}

export interface IUserContext extends IBaseUserContext {
  userId: mongoose.Types.ObjectId;
}

const UserContextSchema = new Schema<IUserContext>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
    index: true,
    unique: true,
  },
  mainPurpose: { type: String },
  resourceDemands: { type: String },
  regions: { type: String },
  osDependencies: { type: String },
  softwareDependencies: { type: String },
  budgetConsiderations: { type: String },
  generalDescription: { type: String, default: "" },
});

const UserContextModel = mongoose.model<IUserContext>(
  "UserContext",
  UserContextSchema
);

export default UserContextModel;
