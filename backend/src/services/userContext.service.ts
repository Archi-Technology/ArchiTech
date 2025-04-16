import { IBaseUser } from "../models/user.model";
import UserContextModel, { IBaseUserContext, IUserContext } from "../models/userContext.model";
import { BaseService } from "./base.service";

export class UserContextService extends BaseService<IUserContext> {
  private userContextBaseService: BaseService<IUserContext>
  constructor() {
    super(UserContextModel);
    this.userContextBaseService = new BaseService(UserContextModel);
  }
    async saveUserContext(userContext: IBaseUserContext, userId: string) {
    
        const newUserContext = new UserContextModel({...userContext, userId});
        return await newUserContext.save();
    }

    async checkUserContext( userId: string) {
       return (await this.userContextBaseService.getModelByFilter({ userId }));
        
    }
}
