import { Request, Response } from 'express';
import { BaseService } from "../services/base.service";
import { exractUserIdFromToken } from "../utils/user.util";


export class BaseController<T, Service extends BaseService<T>> {
  protected service: Service;
  protected userIdFieldName: keyof T;
  constructor(service: Service, userIdFieldName = 'userId' as keyof T) {
    this.service = service;
    this.userIdFieldName = userIdFieldName
  }

  async create(req: Request, res: Response) {
    try {

      const userId = exractUserIdFromToken(req);
      const message = await this.service.createWithStatus({ ...req.body }, userId);
      res.json(message)

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  async getById(req: Request, res: Response) {
    try {
      if (!req?.params?.id) throw new Error('no id provided')
      const id = req?.params?.id
      const entity: T = await this.service.getById(id);
      res.json(entity)

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  async deleteById(req: Request, res: Response) {
    try {
      if (!req?.params?.id) throw new Error('no id provided')
      const id = req?.params?.id

      const userId = exractUserIdFromToken(req);
      if (!(await this.service.validateUserId(id, userId, this.userIdFieldName))) throw new Error ('not allowed to delete this entity')
      const isDeleted: boolean = await this.service.deleteById(id);
      res.json( isDeleted )

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  async update(req: Request, res: Response) {
    try {

      const { id } = req.body;
      const userId = exractUserIdFromToken(req);
      if (!(await this.service.validateUserId(id, userId, this.userIdFieldName))) throw new Error ('not allowed to edit this entity')

      const message = await this.service.update(req.body, id);
      res.json( message )

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
