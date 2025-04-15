import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Alert, Grid, Button } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { getUsers, getUserPosts, getPostComments } from '../services/api';
import { getFeedPosts } from '../utils/dataProcessing';
import PostCard from '../components/PostCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [feedPosts, setFeedPosts] = useState([]);
  const [users, setUsers] = useState({});

  const fetchData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
        setError(null);
      } else {
        setLoading(true);
      }
      
      // Fetch all users if not already fetched
      let usersData = users;
      if (Object.keys(usersData).length === 0) {
        const usersResponse = await getUsers();
        usersData = usersResponse.users || {};
        setUsers(usersData);
      }
      
      // Store posts and comments data
      const postsData = {};
      const commentsData = {};
      
      // Fetch posts for each user
      for (const [userId, userName] of Object.entries(usersData)) {
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
      
      // Process data to get feed posts
      const feedPostsData = getFeedPosts(postsData, commentsData);
      setFeedPosts(feedPostsData);
      
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
    
    // Set up polling for real-time updates
    const intervalId = setInterval(() => {
      fetchData(true);
    }, 30000); // Poll every 30 seconds
    
    return () => clearInterval(intervalId);
  }, []);

  const handleRefresh = () => {
    fetchData(true);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Feed
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<RefreshIcon />} 
          onClick={handleRefresh}
          disabled={refreshing}
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </Box>
      
      {loading ? (
        <LoadingState message="Loading feed..." />
      ) : error ? (
        <ErrorState message={error} onRetry={() => fetchData()} />
      ) : feedPosts.length === 0 ? (
        <Alert severity="info">No posts found.</Alert>
      ) : (
        <Grid container spacing={3}>
          {feedPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Feed;
