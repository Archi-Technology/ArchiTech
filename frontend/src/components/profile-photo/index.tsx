import React, { useMemo } from "react";
import './index.scss'
import defaultUser from '../../assets/default-avatar-icon.jpg'
import ChatGPTLogo from '../../assets/ChatGPT_logo.png'
import { baseURL } from "../../services/axios/AxiosInstance";

interface IProp {
    width: number;
    height: number;
    userImage?: string;
    classnames?: string;
    ObjectUrl?: boolean;
    isAiGenerated?: boolean;
    onClick?: () => void;
}

export const ProfilePhoto: React.FC<IProp> = ({ width, height, userImage, classnames, onClick, ObjectUrl = false, isAiGenerated = false }: IProp) => {
    const imageSrc = useMemo(() => {
        if (isAiGenerated) return ChatGPTLogo;
        if (!userImage) return defaultUser;
        if (ObjectUrl) return userImage;
        return `${baseURL}/api/uploads/${userImage}`
    }, [ObjectUrl, userImage])

    const handleClick = () => {
        if (onClick) {
            onClick(); // Call the passed onClick function
        }
    };

    return <div className={`profile-photo-container ${classnames} ${!isAiGenerated ? 'cursor' : ''}`} onClick={handleClick}>
        <img className='profile-photo' src={imageSrc} width={width} height={height} />
    </div>
}
