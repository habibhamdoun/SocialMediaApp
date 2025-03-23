import { Box, Typography, Avatar } from '@mui/material';
import { colors } from '../../constants/colors';
import getTimeAgo from './getTime';

export default function PostHeader({ posts }) {
  return (
    <>
      {posts.map((post) => {
        return (
          <Box
            key={post.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 2,
            }}
          >
            <Avatar
              src={post.profilePic}
              alt={`${post.username}'s profile picture`}
              sx={{ width: 40, height: 40 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                sx={{
                  color: colors.white,
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                }}
              >
                {post.username}
              </Typography>
              <Typography
                sx={{
                  color: colors.gray,
                  fontSize: '0.7rem',
                }}
              >
                {getTimeAgo(post.timestamp)}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );
}
