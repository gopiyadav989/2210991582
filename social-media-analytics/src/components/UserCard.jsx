import React from 'react';
import { Avatar, Card, CardContent, CardHeader, Typography, Box } from '@mui/material';
import { getUserImageUrl } from '../utils/dataProcessing';

const UserCard = ({ user, rank }) => {
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
            src={getUserImageUrl(user.userId)}
            alt={user.userName}
            sx={{ width: 56, height: 56 }}
          />
        }
        title={
          <Typography variant="h6">
            {rank && <span style={{ marginRight: '8px', fontWeight: 'bold' }}>#{rank}</span>}
            {user.userName}
          </Typography>
        }
        subheader={`User ID: ${user.userId}`}
      />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1">
            Posts: {user.posts.length}
          </Typography>
          <Typography variant="body1" color="primary" fontWeight="bold">
            Total Comments: {user.totalComments}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
