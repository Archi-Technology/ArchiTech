import { Request, Response } from "express";
import { IComment } from "../models/comment.model";
import { CommentService } from "../services/comment.service";
import { BaseController } from "./base.controller";


  export class CommentController extends BaseController<IComment, CommentService> {
    constructor() {
      super(new CommentService());
    }

  async CommentsByPostId(req: Request, res: Response) {
    try {
      if (!req?.params?.postid) throw new Error('no id provided')
      const postId = req?.params?.postid
      const entites: IComment[] =
      await this.service.getCommentsByPostId(postId)
      res.json(entites)

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const commentController = new CommentController();

