import React, { useMemo, useState } from 'react';
import userBack from '../../assets/deserted-beach-travel-1920x720.jpg';
import { CreatePost } from '../../components/create-post';
import UserCard from '../../components/user-card';
import { useUser } from '../../contexts/userContext';
import './index.scss'; // Import the CSS styles for the navbar
import { useGetFeedPosts, userPostKey } from '../../services/postService';

import { useGetUserDataById } from '../../services/userService'; // Import the hook
import { useLocation } from 'react-router-dom';
import MapComponent from '../../components/map';
import post from '../../components/post';
import { CircularProgress } from '@mui/material';
interface Ilocation {
    position: [number, number]; 
}

const MapView: React.FC = () => {
    const [locationName, setLocationName] = useState('');
    const [locationY, setLocationX] = useState(0);
    const [locationX, setLocationY] = useState(0);

    const { data, isLoading, mutate } = useGetFeedPosts();
    const mappedData = useMemo(() => data?.map((post) => ({ position: [post.locationX , post.locationY ] }) )|| [] , [data]);
    const filteredLocations = useMemo(() => mappedData.filter((location) => !!location.position[0] && !!location.position[1]) as Ilocation[]  , [mappedData]); 
    
    if (isLoading || !data) return <CircularProgress />
    
    return (
        <div className='page-wrapper'>
            <MapComponent
                locationNameChange={setLocationName}
                setLocationX={setLocationX}
                setLocationY={setLocationY}
                savedLocations={filteredLocations}
                large={true}
                wholeMapZoom={true}
                edit={false}
            />
        </div>
    );
};

export default MapView;
