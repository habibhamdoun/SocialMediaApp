import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  Fab,
  Zoom,
  useTheme,
  Portal,
} from '@mui/material';
import Post from '../components/Posts/Post';
import AddPost from '../components/Posts/AddPost';
import { Add } from '@mui/icons-material';
import { colors } from '../constants/colors';

const samplePosts = [
  {
    id: 1,
    author: 'John Doe',
    username: 'johndoe',
    profilePic: 'https://via.placeholder.com/40',
    timestamp: new Date('2025-03-22T15:30:00Z').getTime(),
    caption:
      'Just finished building my first React application. The journey was challenging but rewarding!',
    imageUrl: 'https://via.placeholder.com/600x400',
    likes: 42,
    comments: [],
    isLiked: false,
  },
  {
    id: 2,
    author: 'Jane Smith',
    username: 'janesmith',
    profilePic: 'https://via.placeholder.com/40',
    timestamp: new Date('2025-03-23T10:15:00Z').getTime(),
    caption:
      'Beautiful day for hiking! The mountains are calling and I must go. #nature #adventure',
    imageUrl: 'https://via.placeholder.com/600x400',
    likes: 28,
    comments: [],
    isLiked: true,
  },
  {
    id: 3,
    author: 'Alex Johnson',
    username: 'alexj',
    profilePic: 'https://via.placeholder.com/40',
    timestamp: new Date('2025-03-23T08:45:00Z').getTime(),
    caption:
      "Working on a new project using Material UI and React. So far, it's been a great experience. Any tips from the community?",
    imageUrl: 'https://via.placeholder.com/600x400',
    likes: 15,
    comments: [],
    isLiked: false,
  },
];

const HomePage = () => {
  const [posts, setPosts] = useState(samplePosts);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [openAddPostModal, setOpenAddPostModal] = useState(false);
  const addPostRef = useRef(null);
  const theme = useTheme();

  const updatePost = (updatedPost) => {
    setPosts(
      posts.map((post) =>
        post.id === updatedPost[0].id ? updatedPost[0] : post,
      ),
    );
  };

  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        if (addPostRef.current) {
          const addPostPosition = addPostRef.current.getBoundingClientRect();
          setShowFloatingButton(addPostPosition.bottom < 0);
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleOpenModal = () => {
    setOpenAddPostModal(true);
  };

  const handleCloseModal = () => {
    setOpenAddPostModal(false);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        pt: 4,
        pb: 6,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Container maxWidth='sm'>
        <Typography
          sx={{
            color: colors.black,
            fontSize: '2rem',
            textAlign: 'center',
            mb: 4,
          }}
        >
          My Social Feed
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box ref={addPostRef} sx={{ width: '100%' }}>
            <AddPost
              onAddPost={addNewPost}
              openModal={openAddPostModal}
              onCloseModal={handleCloseModal}
            />
          </Box>

          {posts.map((post) => (
            <Post
              key={post.id}
              //  postData={[post]}
              updatePost={updatePost}
            />
          ))}
        </Box>
      </Container>

      <Portal>
        <Zoom
          in={showFloatingButton}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              showFloatingButton ? transitionDuration.exit : 0
            }ms`,
          }}
          unmountOnExit
        >
          <Fab
            color='primary'
            aria-label='add post'
            onClick={handleOpenModal}
            sx={{
              position: 'fixed',
              bottom: 20,
              right: '10%',
              boxShadow: 3,
            }}
          >
            <Add />
          </Fab>
        </Zoom>
      </Portal>
    </Box>
  );
};
export default HomePage;
