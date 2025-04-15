import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Alert, Grid } from '@mui/material';
import { getUsers, getUserPosts, getPostComments } from '../services/api';
import { getTrendingPosts } from '../utils/dataProcessing';
import PostCard from '../components/PostCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const TrendingPosts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trendingPosts, setTrendingPosts] = useState([]);

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
      
      // Process data to get trending posts
      const trendingPostsData = getTrendingPosts(postsData, commentsData);
      setTrendingPosts(trendingPostsData);
      
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
        Trending Posts
      </Typography>
      
      {loading ? (
        <LoadingState message="Loading trending posts..." />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchData} />
      ) : trendingPosts.length === 0 ? (
        <Alert severity="info">No trending posts found.</Alert>
      ) : (
        <Grid container spacing={3}>
          {trendingPosts.map((post) => (
            <Grid item xs={12} sm={6} key={post.id}>
              <PostCard post={post} isTrending={true} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default TrendingPosts;
