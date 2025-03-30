import { Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { useCallback, useState } from 'react';
import { useUser } from '../../contexts/userContext';
import EditProfileModal from '../edit-profile-modal';
import { ProfilePhoto } from '../profile-photo';
import { UserPosts } from '../user-posts';
import './index.scss'; // Import the CSS styles for the navbar


type UserProps = {
  userProfileImage?: string;
  username: string;
  userDescription?: string;
  userid: string;
  onEdit?: () => void;
};

const UserCard: React.FC<UserProps> = ({ userProfileImage, username, userDescription, userid, onEdit }) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);


  const { setUserData, user } = useUser();

  const displayEdit = () => userid === user?._id


  const toggleEditPopUp = useCallback(() => setIsEditOpen((prevState) => !prevState), [setIsEditOpen])

  return (
    <Card className='card-wrapper' sx={{ minWidth: 750, boxShadow: 2 }}>
      <CardContent className='card-contnet'>
        <div className='card-header'>
          <div className='header-left'>
            <ProfilePhoto userImage={userProfileImage} width={135} height={135} />

            <div className='titles'>
              <Typography variant="h4" component="div">
                {username}
              </Typography>
              <Typography className='sub-text' variant='h6' gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                @{username.replace(/\s+/g, "")}
              </Typography>
            </div>
          </div>
          {displayEdit() &&
            <div className='header-right'>
              <Button variant="contained" className='edit-button' onClick={toggleEditPopUp}> Edit Profile</Button>
            </div>
          }

        </div>

        <div>
          <Typography component="div" gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {userDescription ?? 'add a description to your profile'}
          </Typography>
        </div>

        <div className='posts-tab'>
          <Typography className='myposts' variant="h5" >
            Posts
          </Typography>

          <UserPosts isOwner={displayEdit()} userid={userid} username={username} userProfileImage={userProfileImage} />
        </div>

        <EditProfileModal onEdit={onEdit} userid={userid} defaultValues={{ username, description: userDescription, file: userProfileImage }} isOpen={isEditOpen} toggleIsOpen={toggleEditPopUp}>

        </EditProfileModal>


      </CardContent>
    </Card>
  );
};

export default UserCard;
