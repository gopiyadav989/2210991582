import React from 'react';
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography, Box, Chip } from '@mui/material';
import { Comment as CommentIcon } from '@mui/icons-material';
import { getUserImageUrl, getPostImageUrl } from '../utils/dataProcessing';

const PostCard = ({ post, isTrending }) => {
  return (
    <Card sx={{ 
      mb: 2, 
      boxShadow: 3,
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: 6,
      }
    }}>
      <CardHeader
        avatar={
          <Avatar
            src={getUserImageUrl(post.userid)}
            alt={post.userName || `User ${post.userid}`}
          />
        }
        title={post.userName || `User ${post.userid}`}
        subheader={`Post ID: ${post.id}`}
        action={
          isTrending && (
            <Chip 
              label="Trending" 
              color="primary" 
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                color: 'white'
              }} 
            />
          )
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={getPostImageUrl(post.id)}
        alt="Post image"
      />
      <CardContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {post.content}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CommentIcon sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {post.commentCount} comments
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
