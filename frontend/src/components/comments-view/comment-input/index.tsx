import React, { useCallback, useState } from "react";
import './index.scss'
import { ProfilePhoto } from "../../profile-photo";

interface IProp {
    onSubmit: (newComment: string) => Promise<void>;
    userImage?: string
}

export const CommentInput: React.FC<IProp> = ({onSubmit, userImage}: IProp) => {
    const [newComment, setNewComment] = useState<string>("");

    const handleAddComment= useCallback(() => {
        if(newComment.trim().length) {
            onSubmit(newComment); 
            setNewComment('');  
        }
    },[setNewComment, newComment, onSubmit])

    return <div className="comment-input-container">
        <ProfilePhoto width={25} height={25} userImage={userImage} />
         <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Post</button>
    </div>
}