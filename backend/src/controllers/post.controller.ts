import { Request, Response } from 'express';
import { IPost } from '../models/post.model';
import { PostService } from '../services/post.service';
import { exractUserIdFromToken } from '../utils/user.util';
import { BaseController } from './base.controller';


export class PostController extends BaseController<IPost, PostService> {
  constructor() {
    super(new PostService());
  }

  async like(req: Request, res: Response) {
    this.changeLikeMode(req, res, true)
  }

  async unlike(req: Request, res: Response) {
    this.changeLikeMode(req, res, false)
  }

  async createPostGeneratedByAI(req: Request, res: Response) {
    try {

      const aiPost = await this.service.createPostGeneratedByAI();
      res.json(aiPost)

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  private async changeLikeMode(req: Request, res: Response, isLiked: boolean) {
    try {
      if (req?.params?.postid) {

        const postid = req.params.postid;

        const userId = exractUserIdFromToken(req);

        const updatePostStatus = await this.service.changeLikeMode(userId, postid, isLiked);

        res.json(updatePostStatus);

      } else {
        throw new Error('postid not provided')
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async allPosts(req: Request, res: Response) {
    try {

      const posts = await this.service.getAllPosts();
      res.json(posts);

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  override async update(req: Request, res: Response) {
    try {

      const { id, text, file, location, locationX, locationY } = req.body;
      const userId = exractUserIdFromToken(req);
      if (!(await this.service.validateUserId(id, userId, this.userIdFieldName))) throw new Error('not allowed to edit this entity')

      const fileMetadata = req.file;
      if (!id || !text || !(file || fileMetadata)) throw new Error('one of the fields not provided')
      const updateData: {
        text: string, image: string, location: string, locationX: number, locationY: number
      } = { text,location: (location ?? 'Location Not Updated'), locationX: (locationX ?? 0), locationY: (locationY ?? 0), image: fileMetadata?.filename || file };

      const message = await this.service.update(updateData, id);
      res.json(message)

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  override async create(req: Request, res: Response) {
    try {

      const { text, location, locationX, locationY } = req.body;
      const userId = exractUserIdFromToken(req);
      const file = req.file;
      if (!text || !file) throw new Error('one of the fields not provided');

      const newPost: {
        text: string, image: string, location: string, locationX: number, locationY: number
      } = { text, image: file.filename, location: (location ?? 'Location Not Updated'), locationX: (locationX ?? 0), locationY: (locationY ?? 0) };
      const message = await this.service.createWithStatus(newPost, userId);
      res.json(message)

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}

export const postController = new PostController();

