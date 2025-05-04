import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import UserModel, { IBaseUser, IUser } from "../models/user.model";
import { BaseService } from "./base.service";
import UserContextModel, {
  IBaseUserContext,
  IUserContext,
} from "../models/userContext.model";
import { UserContextService } from "./userContext.service";

export class UserService extends BaseService<IUser> {
  private UserContextService: UserContextService;

  constructor() {
    super(UserModel);
    this.UserContextService = new UserContextService();
  }

  async saveUser(user: IBaseUser) {
    const { username, password, email } = user;
    if (!username || !password || !email)
      throw new Error("one of the fields missing");
    await this.checkIfUsernameExists(username);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      email,
      image: "",
    });
    return await newUser.save();
  }

  async saveUserContext(userContext: IBaseUserContext, userId: string) {
    return this.UserContextService.saveUserContext(userContext, userId);
  }

  async checkuserContext(userId: string) {
    return this.UserContextService.checkUserContext(userId);
  }

  async createUser(user: IBaseUser) {
    await this.saveUser({ ...user, tokens: [] });
    return "create entity sucssfully";
  }

  private async checkIfUsernameExists(username: string) {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) throw new Error("User already exists");
  }
}
