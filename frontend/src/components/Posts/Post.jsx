import PostHeader from './PostHeader.jsx';
import Content from './Content.jsx';
import { useState } from 'react';
import post from '../../testData/post.js';
import { Container, Box, Typography } from '@mui/material';
import { colors, styles } from '../../constants/colors.js';

const Post = ({ postData: initialPostData, updatePost: updateParentPost }) => {
  const [postData, setPostData] = useState(initialPostData || [...post]);

  const handleUpdatePost = (updateFn) => {
    const updatedData = updateFn(postData);
    setPostData(updatedData);
    if (updateParentPost) {
      updateParentPost(updatedData);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: colors.primary,
        borderRadius: styles.borderRadius,
        mb: 3,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 3,
        }}
      >
        <PostHeader posts={postData} />
        <Content posts={postData} updatePost={handleUpdatePost} />
      </Box>
    </Box>
  );
};

export default Post;
