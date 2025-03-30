import express, { Request, Response } from 'express';
import { IPost, IPostWithComments } from '../models/post.model';
import { IUser } from '../models/user.model';
import { UserService } from '../services/user.service';
import { exractUserIdFromToken } from '../utils/user.util';
import { BaseController } from './base.controller';

export class UserController extends BaseController<IUser, UserService> {

  constructor() {
    super(new UserService(), '_id');
  }

  override async create(req: Request, res: Response): Promise<void> {
    try {

      const message = await this.service.createUser(req.body);
      res.json(message)

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getUserPosts(req: Request, res: Response) {
    try {
      if (req?.params?.userid) {
        const userid = req.params.userid;
        const posts: IPostWithComments[] = await this.service.getUserPosts(userid);

        res.json(posts);

      } else {
        throw new Error('userid not provided')
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async userData(req: Request, res: Response) {
    try {
      const user = (req as express.Request & { user?: any }).user;
      const userData = await this.service.getById(user._id);

      res.json( userData );
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async userDetials(req: Request, res: Response) {
    try {

      const userData = await this.service.getById(req.params.id);

      res.json( userData );
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId = exractUserIdFromToken(req);
      const { username, file, description } = req.body;
      const fileMetadata = req.file;

      if (!username ) {
        throw new Error('no username provided');
      }

      const updateData: { username?: string, image?: string, description?: string
      } = {};
      if (username) updateData.username = username;
      updateData.image = fileMetadata?.filename ?? file;
      updateData.description = description;

      const message = await this.service.update(updateData, userId);

      res.json( message );

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

}
export const userController = new UserController();

