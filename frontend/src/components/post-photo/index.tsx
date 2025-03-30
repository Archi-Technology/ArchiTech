import React, { useMemo } from "react";
import './index.scss'
import defaultPost from '../../assets/defaultPost.jpeg'
import { baseURL } from "../../services/axios/AxiosInstance";

interface IProp {
    userImage?: string;
    classnames?: string;
    ObjectUrl?: boolean
}

export const PostPhoto: React.FC<IProp> = ({ userImage, classnames, ObjectUrl = false }: IProp) => {
    const imageSrc = useMemo(() => {
        if (!userImage) return defaultPost;
        if (ObjectUrl) return userImage;
        return `${baseURL}/api/uploads/${userImage}`
    }, [ObjectUrl, userImage])
    
    return <div className={`post-photo-container ${classnames}`}>
        <img className='post-photo' src={imageSrc} />
    </div>
}
