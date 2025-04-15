import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import { getUsers, getUserPosts, getPostComments } from '../services/api';
import { getTopUsers } from '../utils/dataProcessing';
import UserCard from '../components/UserCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const TopUsers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topUsers, setTopUsers] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all users
      const usersResponse = await getUsers();
      const users = usersResponse.users || {};
      
      // Store posts and comments data
      const postsData = {};
      const commentsData = {};
      
      // Fetch posts for each user
      for (const [userId, userName] of Object.entries(users)) {
        try {
          const postsResponse = await getUserPosts(userId);
          const userPosts = postsResponse.posts || [];
          
          // Add userName to each post
          userPosts.forEach(post => {
            post.userName = userName;
          });
          
          postsData[userId] = userPosts;
          
          // Fetch comments for each post
          for (const post of userPosts) {
            try {
              const commentsResponse = await getPostComments(post.id);
              commentsData[post.id] = commentsResponse.comments || [];
            } catch (error) {
              console.error(`Error fetching comments for post ${post.id}:`, error);
              commentsData[post.id] = [];
            }
          }
        } catch (error) {
          console.error(`Error fetching posts for user ${userId}:`, error);
          postsData[userId] = [];
        }
      }
      
      // Process data to get top users
      const topUsersData = getTopUsers(users, postsData, commentsData);
      setTopUsers(topUsersData);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Top Users with Most Commented Posts
      </Typography>
      
      {loading ? (
        <LoadingState message="Loading top users..." />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchData} />
      ) : topUsers.length === 0 ? (
        <Alert severity="info">No users found.</Alert>
      ) : (
        <Box>
          {topUsers.map((user, index) => (
            <UserCard key={user.userId} user={user} rank={index + 1} />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default TopUsers;
