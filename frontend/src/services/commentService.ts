import { showToast } from "../consts/toast"
import { CommentModel } from "../interfaces/post"
import { IGenericResponse } from "../interfaces/user"
import { AxiosInstence } from "./axios/AxiosInstance"

export const addComment = async (postId: string, newComment: string) => {
    try {
         (await AxiosInstence.post<CommentModel>(`comment/create`, {
            text: newComment,
            postId
         }))
        showToast('successfully add comment', "success")
      } catch (error) {
        showToast('failed to add comment', "error")
    }
}