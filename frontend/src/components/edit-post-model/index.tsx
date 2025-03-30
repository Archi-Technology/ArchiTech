import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useCallback, useRef } from 'react';
import './index.scss'; // Import the CSS styles for the navbar
import { IPost } from '../../interfaces/post';



type EditPostModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues: { text: string, image: string };
  onSubmit: (updatedPost: Partial<IPost>) => Promise<void>
  postId: string;
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


const EditPostModal: React.FC<EditPostModalProps> = ({ isOpen, setIsOpen, defaultValues, onSubmit, postId }) => {
  const descInputRef = useRef<HTMLInputElement>(null);
  const onEdit = useCallback(async () => {
    const updatedDesc = descInputRef.current?.value ? descInputRef.current.value : defaultValues.text;
    const updatedPost = {
      text: updatedDesc,
      image: 'editPost.png'
    }
    await onSubmit(updatedPost);
  }, [onSubmit])

  const handleClose = useCallback(() => setIsOpen(false),[setIsOpen]);

  return (
    <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        style={{border: 'none'}}
        aria-describedby="unstyled-modal-description"
        open={isOpen}
        onClose={handleClose}
      >
        <Box sx={style}>
          <div className='box-content'>
            <div className='headLines'>
              <h3> Edit  post</h3>
              <p className='sub-comment'> Make changes to your post here.</p>
            </div>
           <TextField inputRef={descInputRef} defaultValue={defaultValues.text} className='TextField' multiline={true} rows={3} id="outlined-basic" label="Description" variant="outlined" />
            <input
              accept="image/*"

              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
            />
            <label className='imageUploadLabel' htmlFor="raised-button-file">
              <h4 className='imageUpload'>
                image upload
              </h4>
            </label>

            <div className='footer'>
              <Button onClick={onEdit} variant="contained" component="span" >
                Save Changes
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

    </div>
  );
};

export default EditPostModal;
