import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Popover,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  Close,
} from '@mui/icons-material';
import pfp1 from '../../testData/pfp icon.jpg';
import { colors, styles } from '../../constants/colors';

export default function Content({ posts, updatePost }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const lastClickTimeRef = useRef(0);
  const [showDoubleTapHeart, setShowDoubleTapHeart] = useState(null);

  const handleComment = (event, postId) => {
    event.preventDefault();
    const form = event.target;
    const comment = form.elements['added-comments'].value.trim();
    if (!comment) return;
    postId = Number(postId);
    updatePost((prevPost) =>
      prevPost.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  username: 'Test',
                  profilePic: pfp1,
                  comment: comment,
                  likes: 0,
                  reply: [],
                },
              ],
            }
          : post,
      ),
    );
    form.reset();
  };

  const handleLike = (postId) => {
    postId = Number(postId);
    updatePost((prevPost) =>
      prevPost.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  };

  const handleDoubleTap = (event, postId) => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTimeRef.current;

    // If the time between clicks is less than 300ms, consider it a double-tap
    if (timeDiff < 300 && timeDiff > 0) {
      postId = Number(postId);
      const post = posts.find((p) => p.id === postId);

      // Only like if it's not already liked
      if (!post.isLiked) {
        handleLike(postId);

        // Show the heart animation
        setShowDoubleTapHeart(postId);
        setTimeout(() => {
          setShowDoubleTapHeart(null);
        }, 1000);
      }
    }

    lastClickTimeRef.current = currentTime;
  };

  const handleOpenComments = (event, postId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPost(Number(postId));
  };

  const handleCloseComments = () => {
    setAnchorEl(null);
    setSelectedPost(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ width: '100%' }}>
      {posts.map((post) => (
        <Box
          key={post.id}
          sx={{
            mb: 4,
            width: '100%',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
            }}
          >
            <Box
              component='img'
              src={post.imageUrl}
              alt={`${post.username}'s post`}
              onClick={(e) => handleDoubleTap(e, post.id)}
              sx={{
                width: '100%',
                borderRadius: `${styles.borderRadius}px ${styles.borderRadius}px 0 0`,
                cursor: 'pointer',
              }}
            />

            {/* Heart animation on double tap */}
            {showDoubleTapHeart === post.id && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'heart-pulse 1s ease-in-out',
                  '@keyframes heart-pulse': {
                    '0%': {
                      opacity: 0,
                      transform: 'translate(-50%, -50%) scale(0.5)',
                    },
                    '50%': {
                      opacity: 1,
                      transform: 'translate(-50%, -50%) scale(1.2)',
                    },
                    '100%': {
                      opacity: 0,
                      transform: 'translate(-50%, -50%) scale(1)',
                    },
                  },
                }}
              >
                <Favorite sx={{ fontSize: 80, color: 'error.main' }} />
              </Box>
            )}
          </Box>

          <Box
            sx={{ mt: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <IconButton
              onClick={() => handleLike(post.id)}
              sx={{ color: post.isLiked ? 'error.main' : 'inherit' }}
            >
              {post.isLiked ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <IconButton
              onClick={(e) => handleOpenComments(e, post.id)}
              sx={{
                color: colors.white,
              }}
            >
              <ChatBubbleOutline />
            </IconButton>
          </Box>
          <Typography sx={{ mb: 1, color: colors.white }}>
            {post.likes} {post.likes === 1 ? 'like' : 'likes'}
          </Typography>
          <Typography sx={{ mb: 1, color: colors.white }}>
            <Box component='span' sx={{ fontWeight: 'bold' }}>
              {post.username}
            </Box>{' '}
            {post.caption}
          </Typography>
          <Typography
            onClick={(e) => handleOpenComments(e, post.id)}
            sx={{
              mb: 2,
              color: colors.white,
              opacity: 0.6,
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            View all {post.comments.length}{' '}
            {post.comments.length === 1 ? 'comment' : 'comments'}
          </Typography>
          <Box
            component='form'
            onSubmit={(e) => handleComment(e, post.id)}
            sx={{ width: '100%', mb: 2 }}
          >
            <TextField
              fullWidth
              name='added-comments'
              placeholder='Add a comment...'
              variant='standard'
              InputProps={{
                disableUnderline: true,
                sx: {
                  color: colors.white,
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
        </Box>
      ))}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseComments}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'down',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            width: '90%',
            maxWidth: 400,
            maxHeight: '60vh',
            marginLeft: 3,
            bgcolor: colors.primary,
            borderRadius: styles.borderRadius,
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography
              variant='h6'
              sx={{ color: colors.white, fontWeight: 'bold' }}
            >
              Comments
            </Typography>
            <IconButton
              onClick={handleCloseComments}
              sx={{ color: colors.white }}
            >
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ bgcolor: colors.gray, opacity: 0.3, mb: 2 }} />
          {selectedPost !== null &&
            posts.find((post) => post.id === selectedPost)?.comments.length ===
              0 && (
              <Typography
                sx={{ color: colors.gray, textAlign: 'center', my: 4 }}
              >
                No comments yet. Be the first to comment!
              </Typography>
            )}
          {selectedPost !== null &&
            posts
              .find((post) => post.id === selectedPost)
              ?.comments.map((comment, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    pb: 2,
                    borderBottom: `1px solid ${colors.gray}30`,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar
                      src={comment.profilePic}
                      alt='Profile'
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box>
                      <Typography
                        sx={{ fontWeight: 'bold', color: colors.white }}
                      >
                        {comment.username}
                      </Typography>
                      <Typography sx={{ color: colors.white }}>
                        {comment.comment}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
          <Box
            component='form'
            onSubmit={(e) => {
              handleComment(e, selectedPost);
              e.target.elements['added-comments'].focus();
            }}
            sx={{ mt: 2, width: '100%' }}
          >
            <TextField
              fullWidth
              name='added-comments'
              placeholder='Add a comment...'
              variant='outlined'
              size='small'
              InputProps={{
                sx: {
                  color: colors.white,
                  borderColor: `${colors.gray}50`,
                  '&.Mui-focused': {
                    borderColor: colors.white,
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
              autoFocus
            />
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}
