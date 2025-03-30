import mongoose, { Document, Schema } from 'mongoose';
import PostModel from './post.model';

export interface IComment extends Document {
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  text: string;
  date: Date;
}

const CommentSchema = new Schema<IComment>({
  userId: { type: Schema.Types.ObjectId, required: true },
  postId: { type: Schema.Types.ObjectId, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: false }
});

const CommentModel = mongoose.model<IComment>('Comment', CommentSchema);

export default CommentModel;

