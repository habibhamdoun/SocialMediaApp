import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { AddAPhoto, Close } from '@mui/icons-material';
import { colors, styles } from '../../constants/colors';

const AddPost = ({ onAddPost, openModal, onCloseModal }) => {
  const [open, setOpen] = useState(false);
  const [postData, setPostData] = useState({
    caption: '',
    imageUrl: '',
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Handle external open modal trigger
  useEffect(() => {
    if (openModal) {
      setOpen(true);
    }
  }, [openModal]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPostData({
      caption: '',
      imageUrl: '',
    });
    setImagePreview(null);

    // Notify parent component that modal is closed
    if (onCloseModal) {
      onCloseModal();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setPostData({
          ...postData,
          imageUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Only require caption to be filled
    if (postData.caption) {
      const newPost = {
        id: Date.now(),
        username: 'YourUsername', // This would come from user context in a real app
        profilePic: 'https://via.placeholder.com/40',
        timestamp: Date.now(),
        caption: postData.caption,
        imageUrl: postData.imageUrl || '', // Image is now optional
        likes: 0,
        comments: [],
        isLiked: false,
      };

      onAddPost(newPost);
      handleClose();
    }
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: colors.primary,
          borderRadius: styles.borderRadius,
          mb: 3,
          width: '100%',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <Avatar sx={{ width: 40, height: 40 }} />
          <TextField
            placeholder="What's on your mind?"
            variant='standard'
            fullWidth
            onClick={handleOpen}
            InputProps={{
              disableUnderline: true,
              readOnly: true,
              sx: {
                color: colors.white,
                cursor: 'pointer',
                '&::placeholder': {
                  color: colors.gray,
                },
              },
            }}
            sx={{
              '& .MuiInputBase-root': {
                background: 'transparent',
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            borderTop: `1px solid ${colors.gray}30`,
            pt: 2,
          }}
        >
          <Button
            startIcon={<AddAPhoto />}
            onClick={handleOpen}
            sx={{
              color: colors.white,
              textTransform: 'none',
              '&:hover': {
                bgcolor: `${colors.gray}20`,
              },
            }}
          >
            Add Photo
          </Button>
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: colors.primary,
            borderRadius: styles.borderRadius,
            width: '100%',
            maxWidth: 500,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: colors.white,
          }}
        >
          Create Post
          <IconButton
            onClick={handleClose}
            sx={{
              color: colors.white,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 2,
              }}
            >
              <Avatar sx={{ width: 40, height: 40 }} />
              <Typography sx={{ color: colors.white }}>YourUsername</Typography>
            </Box>

            <TextField
              placeholder="What's on your mind?"
              variant='outlined'
              fullWidth
              multiline
              rows={3}
              name='caption'
              value={postData.caption}
              onChange={handleChange}
              InputProps={{
                sx: {
                  color: colors.white,
                  '&::placeholder': {
                    color: colors.gray,
                  },
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: `${colors.gray}50`,
                  },
                  '&:hover fieldset': {
                    borderColor: `${colors.gray}90`,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: colors.white,
                  },
                },
              }}
            />

            {imagePreview ? (
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  mt: 2,
                }}
              >
                <Box
                  component='img'
                  src={imagePreview}
                  alt='Preview'
                  sx={{
                    width: '100%',
                    borderRadius: styles.borderRadius,
                    maxHeight: 300,
                    objectFit: 'cover',
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    color: colors.white,
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                  onClick={() => {
                    setImagePreview(null);
                    setPostData({
                      ...postData,
                      imageUrl: '',
                    });
                  }}
                >
                  <Close />
                </IconButton>
              </Box>
            ) : (
              <Button
                component='label'
                startIcon={<AddAPhoto />}
                sx={{
                  color: colors.white,
                  border: `1px dashed ${colors.gray}`,
                  borderRadius: styles.borderRadius,
                  py: 2,
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: `${colors.gray}20`,
                  },
                }}
              >
                Add Photo (Optional)
                <input
                  type='file'
                  hidden
                  accept='image/*'
                  onChange={handleImageChange}
                />
              </Button>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: 2, justifyContent: 'center' }}>
          <Button
            onClick={handleSubmit}
            variant='contained'
            fullWidth
            disabled={!postData.caption}
            sx={{
              textTransform: 'none',
              bgcolor: postData.caption ? 'primary.main' : `${colors.gray}50`,
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPost;
