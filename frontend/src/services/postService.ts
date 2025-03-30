import useSWR from "swr";
import { showToast } from "../consts/toast";
import { IPost, IPostWithUser } from "../interfaces/post";
import { IGenericResponse } from "../interfaces/user";
import { AxiosInstence } from "./axios/AxiosInstance";

export const userPostKey =  `user-posts`;
export const feedPostKey =  `feed-posts`;


export const useGetUserPosts = (userid?: string) =>
    useSWR<IPost[]>(
        userid ? userPostKey : null, 
        async () => {
            const res = await AxiosInstence.get<IPost[]>(`/user/${userid}/posts`);
            return res.data;
        },
        {
            refreshInterval: 1000 * 10, 
        }
    );


    export const useGetFeedPosts = () =>
        useSWR<IPostWithUser[]>(
            feedPostKey,
            async () => {
                const res = await AxiosInstence.get<IPostWithUser[]>(`/post/all`);
                return res.data;
            }, {
            refreshInterval: 1000 * 10,
        }
        );

export const editPost = async (editedPost: FormData) => {
    try {
        (await AxiosInstence.put<IGenericResponse>(`post/update`, editedPost))
        showToast('successfully update post', "success");
      } catch (error) {
        showToast('failed to edit post', "error")
    }
}

export const createPost = async (newPost: FormData) => {
    try {
        (await AxiosInstence.post<IGenericResponse>(`post/create`, newPost));
        showToast('successfully create post', "success");
      } catch (error) {
        showToast('failed to create post', "error")
    }
}

export const deletePost = async (postId: string) => {
    try {
        (await AxiosInstence.delete<IGenericResponse>(`post/${postId}`)).data
        showToast('successfully delete post', "success");
      } catch (error) {
        showToast('failed to delete post', "error")
    }
}

export const likePost = async (postId: string) => {
    try {
         (await AxiosInstence.post<IGenericResponse>(`post/${postId}/like`)).data
      } catch (error) {
        showToast('failed to like post', "error")
    }
}

export const unlikePost = async (postId: string) => {
    try {
         (await AxiosInstence.post<IGenericResponse>(`post/${postId}/unlike`)).data
      } catch (error) {
        showToast('failed to unlike post', "error")
    }
}
