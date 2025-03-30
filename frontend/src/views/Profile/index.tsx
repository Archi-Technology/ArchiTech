import React from 'react';
import userBack from '../../assets/deserted-beach-travel-1920x720.jpg';
import { CreatePost } from '../../components/create-post';
import UserCard from '../../components/user-card';
import { useUser } from '../../contexts/userContext';
import './index.scss'; // Import the CSS styles for the navbar
import { userPostKey } from '../../services/postService';

import { useGetUserDataById } from '../../services/userService'; // Import the hook
import { useLocation } from 'react-router-dom';

const Profile: React.FC = () => {


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const { data, error, isLoading, mutate } = useGetUserDataById( queryParams.get('id') || null);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='profile-component'>
            <div className="img-wrapper">
                <img className="cover-img" src={userBack} />
            </div>
            <div className="user-wrapper">
                {data?.username && (
                    <UserCard 
                        userid={data._id} 
                        username={data!.username} 
                        userDescription={data.description} 
                        userProfileImage={data.image}
                        onEdit={mutate}
                    />
                )}
            </div>
            <CreatePost keyToRefetch={userPostKey} />
        </div>
    );
};

export default Profile;
