import mongoose, { Document, Schema } from 'mongoose';
import CommentModel, { IComment } from './comment.model';

export interface IPost extends Document {
  text: string;
  date: Date;
  image: string;
  location: string;
  locationX: number;
  locationY: number;
  likes: mongoose.Types.ObjectId[];
  generatedByAI: boolean
  userId?: mongoose.Types.ObjectId;
}

export interface IPostWithComments extends IPost {
  comments: IComment[]
}

const PostSchema = new Schema<IPost>({
  userId: { type: Schema.Types.ObjectId, required: false },
  text: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String, required: false },
  location: { type: String, required: false },
  locationX: { type: Number, required: false },
  locationY: { type: Number, required: false },
  generatedByAI: { type: Boolean, default: false },
  likes: {
    type: [Schema.Types.ObjectId],
    required: false,
    validate: {
      validator: (likes) => {
        return Array.isArray(likes) && likes.length === new Set(likes).size;
      },
      message: "Likes array must have unique values.",
    },
  },
});

PostSchema.pre('deleteOne', { document: false, query: true }, async function (next) {
  const filter = this.getFilter();
  const postId = filter._id;
  if (postId) {
    const result = await CommentModel.deleteMany({ postId });
    console.log(`delete ${result.deletedCount} releted comments`)
  }
  next();
});

const PostModel = mongoose.model<IPost>('Post', PostSchema);

export default PostModel;
