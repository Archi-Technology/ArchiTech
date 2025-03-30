import DeleteIcon from '@mui/icons-material/Delete';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useCallback, useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { editProfile, userDataKey } from '../../services/userService';
import { ProfilePhoto } from '../profile-photo';
import './index.scss'; // Import the CSS styles for the navbar



type EditProfileModalProps = {
  isOpen: boolean;
  toggleIsOpen: () => void;
  defaultValues: { username: string, description?: string, file?: string  };
  userid: string;
  onEdit?: () => void;
};

type FormInputs = {
  username: string;
  description?: string;
  file: File | string | undefined 
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '3%',
  boxShadow: 24,
  p: 4,
  color: 'black'
};


const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, toggleIsOpen, defaultValues, userid, onEdit }) => {

  const onSubmit: SubmitHandler<FormInputs> = useCallback(async (data) => {

    const formData = new FormData();
    formData.append("username", data.username);
    if(data.description) formData.append("description", data.description);
    formData.append("file", data.file ?? "");

    await editProfile(userid, formData);
    onEdit? onEdit(): undefined;
    toggleIsOpen();
  }, [userid])

  const {
    control, // Used to control Material-UI inputs
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<FormInputs>({
    defaultValues,
    mode: 'onChange'
  });

  const updatedFile = useMemo(() =>  watch("file"), [watch("file")] );
  const isFile = useMemo(() => updatedFile instanceof File ,[updatedFile])
  const stringFile = useMemo(() => typeof updatedFile === 'string' ? updatedFile : isFile ? URL.createObjectURL(updatedFile!) : undefined ,[updatedFile, isFile])
  const setFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files ? e.target.files[0] : undefined
    setValue('file', file , {shouldDirty: true}) 
  }, [setValue])

 

  return (
    <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={isOpen}
        onClose={toggleIsOpen}
      >

        
        <Box sx={style} onSubmit={handleSubmit(onSubmit)} component="form">
          <div className='box-content'>
            <div className='headLines'>
              <h3> Edit  profile</h3>
              <p className='sub-comment'> Make changes to your profile here.</p>
            </div>
            
            <div className="image-input">
            
            <label className='imageUploadLabel' htmlFor="raised-button-file">
                <ProfilePhoto classnames='pointer' ObjectUrl={isFile} userImage={stringFile} width={90} height={90} />
                <input
              accept="image/*"
              {...register("file")}
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={setFile}  
            />
            </label>
            <DeleteIcon onClick={() => setValue('file', undefined, { shouldDirty: true })}  className='delete-button' />
            </div>
            

            <Controller
              name="username"
              control={control}
              rules={{ required: "username is required" }}
              render={({ field }) => (

                <TextField {...field} error={!!errors.username} helperText={errors.username?.message}  className='TextField' id="outlined-basic" label="User Name" variant="outlined" />

              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (

                <TextField  {...field} error={!!errors.description} helperText={errors.description?.message}  className='TextField' multiline={true} rows={3} id="outlined-basic" label="Description" variant="outlined" />

              )}
            />
            
            <div className='footer'>
              <Button type='submit' disabled={!isValid || !isDirty} variant="contained">
                Save Changes
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

    </div>
  );
};

export default EditProfileModal;
