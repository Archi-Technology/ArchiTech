import React from "react";
import { SocialPosts } from "../social-posts";
import { CreatePost } from "../create-post";
import { feedPostKey } from "../../services/postService";
import './index.scss'


export const Feed: React.FC = () => {
    return <div className="feed-container">
        <SocialPosts />
        <CreatePost keyToRefetch={feedPostKey} />

    </div>
}
