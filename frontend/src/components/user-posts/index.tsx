import React, { useCallback, useMemo } from "react";
import userpost from '../../assets/userBack.jpg';
import { IPost, IPostWithUser } from "../../interfaces/post";
import { useGetUserPosts } from "../../services/postService";
import './index.scss';
import { Posts } from "../posts";
import { CircularProgress } from "@mui/material";

interface IProp {
    userid: string;
    userProfileImage?: string;
    username: string;
    isOwner: boolean;
}
export const UserPosts: React.FC<IProp> = ({ userid, userProfileImage, username,isOwner }: IProp) => {

    const { data, isLoading, mutate } = useGetUserPosts(userid);
    const onChangePost = useCallback(() => {
        mutate();
    }, [mutate])

    const posts: IPostWithUser[] | undefined = useMemo(() => data?.map((post) => {
        return {
            ...post,
            postUsername: username,
            postUserImage: userProfileImage
        }
    }),[data])

    if (isLoading  || !posts) return <CircularProgress/>
    return ( <Posts onPostChange={onChangePost} posts={posts}/>
    )
} 