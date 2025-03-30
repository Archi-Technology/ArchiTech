import CommentModel, { IComment } from '../models/comment.model';
import { BaseService } from './base.service';


export class CommentService extends BaseService<IComment> {
    constructor() {
        super(CommentModel);
    }

     async getCommentsByPostId (postId: string)  {
        return await this.getByFilter({postId}); 
    }
    
}



