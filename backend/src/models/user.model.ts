import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document, IBaseUser {
  image?: string;
}

export interface IBaseUser {
  password: string;
  username: string;
  email: string;
  tokens: string[];
  description?: string;
}

const UserSchema = new Schema<IUser>({
  password: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: false },
  tokens: { type: [String], required: false },
  description: { type: String, required: false }
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
