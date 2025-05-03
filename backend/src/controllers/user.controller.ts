import express, { Request, Response } from "express";
import { IUser } from "../models/user.model";
import { UserService } from "../services/user.service";
import { exractUserIdFromToken } from "../utils/user.util";
import { BaseController } from "./base.controller";

export class UserController extends BaseController<IUser, UserService> {
  constructor() {
    super(new UserService(), "_id");
  }

  override async create(req: Request, res: Response): Promise<void> {
    try {
      const message = await this.service.createUser(req.body);
      res.json(message);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async userData(req: Request, res: Response) {
    try {
      const user = (req as express.Request & { user?: any }).user;
      const userData = await this.service.getById(user._id);

      res.json(userData);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async saveUserContext(req: Request, res: Response) {
    try {
      const user = (req as express.Request & { user?: any }).user;
      const userData = await this.service.saveUserContext(req.body, user._id);

      res.json(userData);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async checkUserContext(req: Request, res: Response) {
    try {
      const user = (req as express.Request & { user?: any }).user;
      const isUserContextNeeded = !(await this.service.checkuserContext(
        user._id
      ));

      res.json(isUserContextNeeded);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async userDetials(req: Request, res: Response) {
    try {
      const userData = await this.service.getById(req.params.id);

      res.json(userData);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
export const userController = new UserController();
