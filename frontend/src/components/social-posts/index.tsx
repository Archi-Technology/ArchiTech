import { CircularProgress } from "@mui/material";
import React, { useCallback } from "react";
import { useUser } from "../../contexts/userContext";
import { useGetFeedPosts } from "../../services/postService";
import './index.scss'
import { Posts } from "../posts";


export const SocialPosts: React.FC = () => {

    const { data, isLoading, mutate } = useGetFeedPosts();
    const { user } = useUser()
    const onPostChange = useCallback(() => {
        mutate();
    }, [mutate])

    if (isLoading || !data) return <CircularProgress />

    return (
        <div className="feed-posts-container">
            {
                // data?.map(((post: IPostWithUser) => <Post key={post._id} postId={post._id} isOwner={user?._id === post.userId} text={post.text} imgUrl={post.image} userImage={post.postUserImage} onPostChange={onPostChange} userName={post.postUsername} date={post.date} likes={post.likes} comments={post.comments}></Post>)) 
               user?._id && <Posts onPostChange={onPostChange} posts={data} classname="feed-posts" />
            }

        </div>
    )
}
