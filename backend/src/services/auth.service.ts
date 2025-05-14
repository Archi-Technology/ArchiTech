import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { IAuthTokens } from '../interfaces/auth';
import UserModel, { IUser } from '../models/user.model';
import TokenInfo from '../types/token';
import { BaseService } from './base.service';
import { UserService } from './user.service';


export class AuthService extends BaseService<IUser> {
  userService: UserService;
  constructor() {
    super(UserModel);
    this.userService = new UserService()
  }

  async registerUser(userdata: {
    password: string;
    username: string;
    email: string;
  }) {
    const newUser = await this.userService.saveUser({ ...userdata, tokens: [] });
    return newUser;

  }

  async loginUser(email: string, password: string) {
    const user = await this.getUserModelByEmail(email);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('bad email or password');


    const { accessToken, refreshToken } = this.generateAuthKeys(user._id);

    if (user.tokens === null) {
      user.tokens = [refreshToken]
    }
    else {
      user.tokens.push(refreshToken)
    }
    
    await user.save();

    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  async logout(token: string) {
    const userId = <TokenInfo>jwt.verify(token, config.REFRESH_SECRET)
    const user = await this.invalidateUserToken(userId?._id, token)
    user.tokens.splice(user.tokens.indexOf(token), 1);
    await user.save();
  }

   async invalidateUserToken(userId: string, token: string) {
    
    const user = await UserModel.findOne({_id: userId});
    if (user == null) throw new Error('invalid request');

    if (!user.tokens.includes(token)) {
      user.tokens = []; // invalidate all user tokens
      await user.save();
      throw new Error('invalid request');
    }

    return user
  }

  async refreshUserToken(token: string) {

    const userId = <TokenInfo>jwt.verify(token, config.REFRESH_SECRET)
    if (!userId?._id) throw new Error('invalid token')

      const user = await this.invalidateUserToken(userId?._id, token);

    const { accessToken, refreshToken } = this.generateAuthKeys(user._id);

    user.tokens[user.tokens.indexOf(token)] = refreshToken;
    await user.save();
    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  async getUserModelByEmail(email: string) {
    const user = await this.userService.getModelByFilter({ email });
    if (!user) throw new Error('User not found');
    return user;
  }

  generateAuthKeys(userId: any): IAuthTokens {
    const accessToken = jwt.sign({ _id: userId }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRATION });
    const refreshToken = jwt.sign({ _id: userId }, config.REFRESH_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken }
  }

  async googleSignIn (credential: any) {
    let user = await this.userService.getModelByFilter({email: credential.email});
    if(!user) {
      const userData: {
        password: string;
        username: string;
        email: string;
      } = {email: credential.email, username: credential.name, password: `${credential.name} - googleSignin`} 
      user = await this.registerUser(userData);
    }

    const { accessToken, refreshToken } = this.generateAuthKeys(user._id);

    if (user.tokens === null) {
      user.tokens = [refreshToken]
    }
    else {
      user.tokens.push(refreshToken)
    }
    
    await user.save();

    return { accessToken: accessToken, refreshToken: refreshToken };
  }

}
