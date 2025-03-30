import PostModel, { IPost } from '../models/post.model';
import { downloadBase64Image, generateDescForPostWithAi, generatePostWithAi, subjectsForPost } from './ai.service';
import { BaseService } from './base.service';

export class PostService extends BaseService<IPost> {
  constructor() {
    super(PostModel);
  }

  async changeLikeMode(userId: string, postId: string, isLike: boolean) {
    const findByIdAndUpdateConfig = isLike ? { $addToSet: { likes: userId } } : { $pull: { likes: userId } };
    const findByIdAndUpdateOptions = { new: true, runValidators: true };
    return await this.customizedUpdate(postId, findByIdAndUpdateConfig, findByIdAndUpdateOptions);
  }
  async savePostGeneratedByAI(text: string, filename: string, date: number) {
    const aiPost = new PostModel({ text, image: filename, date: new Date(date), generatedByAI: true});
    await aiPost.save();
    return aiPost
  }

  async getAllPosts() {
    const allPosts = await PostModel.aggregate([
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

      {
        $lookup: {
          from: "users", // Match the users collection name
          localField: "userId", // Field in posts collection
          foreignField: "_id", // Field in users collection
          as: "postUserDetails"
        }
      },

      // Step 3: Unwind postUserDetails to simplify projection
      {
        $unwind: {
          path: "$postUserDetails",
          preserveNullAndEmptyArrays: true // Allow null values in case there's no matching user
        }
      },

      {
        $project: {
          text: 1,
          date: 1,
          userId: 1,
          comments: 1,
          likes: 1,
          image: 1,
          location: 1,
          locationX: 1,
          locationY: 1,
          postUserImage: {
            $cond: {
              if: {
                $or: [
                  { $eq: ["$postUserDetails.image", ""] },
                  { $not: "$postUserDetails.image" }
                ]
              },
              then: undefined,
              else: "$postUserDetails.image"
            }
          },
          postUsername: "$postUserDetails.username" // Extract username of post user
        }
      },
      { $sort: { date: -1 } }
      // Step 5: Project fields for posts

    ]);

    return allPosts;
  }

  async createPostGeneratedByAI() {
    const randomIndex = Math.floor(Math.random() * subjectsForPost.length);
    const postSubject: string = subjectsForPost[randomIndex];
    const descForPost = await generateDescForPostWithAi(postSubject);
    const imagePost = await generatePostWithAi(descForPost);
    const postDate = new Date().getTime();
    const fileName = `${postSubject}_${postDate}.png`;
    downloadBase64Image(imagePost, fileName);
    return this.savePostGeneratedByAI(descForPost, fileName, postDate);
  }
}












