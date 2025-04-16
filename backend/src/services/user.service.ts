import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import PostModel, { IPost } from '../models/post.model';
import UserModel, { IBaseUser, IUser } from '../models/user.model';
import { BaseService } from './base.service';
import UserContextModel, { IBaseUserContext, IUserContext } from '../models/userContext.model';
import { UserContextService } from './userContext.service';


export class UserService extends BaseService<IUser> {
  private UserContextService: UserContextService

  constructor() {
    super(UserModel);
    this.UserContextService = new UserContextService();
  }

   async saveUser(user: IBaseUser) {
    const { username, password, email } = user
    if (!username || !password || !email) throw new Error('one of the fields missing')
    await this.checkIfUsernameExists(username);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword, email, image: '' });
    return await newUser.save();

  }

  async saveUserContext(userContext: IBaseUserContext, userId: string) {
    return this.UserContextService.saveUserContext(userContext, userId);
  }

  async checkuserContext( userId: string) {
    return this.UserContextService.checkUserContext(userId);
  }

  async createUser(user: IBaseUser) {
     await this.saveUser({...user, tokens: []});
      return 'create entity sucssfully'
  }

  private async checkIfUsernameExists(username: string) {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) throw new Error('User already exists');
  }


  async getUserPosts(userId: string) {
    // return await this.postBaseService.getByFilter({ userId });

    const userPosts = await PostModel.aggregate([
      
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      // Step 2: Lookup comments for each post
      {
        $lookup: {
          from: "comments",
          let: { postId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$postId", "$$postId"] } } },
            // Step 3: Lookup users for each comment
            {
              $lookup: {
                from: "users", // Ensure this matches your users collection name
                localField: "userId",
                foreignField: "_id",
                as: "userDetails"
              }
            },
            // Step 4: Project fields for each comment
            {
              $project: {
                text: 1,
                date: 1,
                userId: 1,
                image: {
                  $cond: {
                    if: {
                      $or: [
                        { $eq: [{ $arrayElemAt: ["$userDetails.image", 0] }, ""] },
                        { $not: { $arrayElemAt: ["$userDetails.image", 0] } },
                      ],
                    },
                    then: undefined,
                    else: { $arrayElemAt: ["$userDetails.image", 0] },
                  },
                },
                username: { $arrayElemAt: ["$userDetails.username", 0] } // Extract username
              }
            }
          ],
          as: "comments"
        }
      },
      { $sort: { date: -1 } }
      // Step 5: Project fields for posts

    ]);
    return userPosts;
  }
}




