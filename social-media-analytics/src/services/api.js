import axios from 'axios';

// Read token from token.json
let token = null;
try {
  // In a real app, we would handle this more securely
  // For this assignment, we'll use a simplified approach
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0NzAxMjQzLCJpYXQiOjE3NDQ3MDA5NDMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjI0N2QwMjE1LWI2YWUtNGQxMS1iZTQxLTFlZDVlZTAwNTE5YyIsInN1YiI6ImdvcGkxNTgyLmJlMjJAY2hpdGthcmEuZWR1LmluIn0sImVtYWlsIjoiZ29waTE1ODIuYmUyMkBjaGl0a2FyYS5lZHUuaW4iLCJuYW1lIjoiZ29waSB5YWRhdiIsInJvbGxObyI6IjIyMTA5OTE1ODIiLCJhY2Nlc3NDb2RlIjoiUHd6dWZHIiwiY2xpZW50SUQiOiIyNDdkMDIxNS1iNmFlLTRkMTEtYmU0MS0xZWQ1ZWUwMDUxOWMiLCJjbGllbnRTZWNyZXQiOiJQeXJqaFNrS1lHUVNXQmJLIn0.7_f94Ty_JPE8qYcEl5Z3ywzkzdsOM9Xh3NNssgh8vXM';
} catch (error) {
  console.error('Error reading token:', error);
}

const api = axios.create({
  baseURL: 'http://20.244.56.144/evaluation-service',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

// API functions for social media analytics
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserPosts = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/posts`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    throw error;
  }
};

export const getPostComments = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw error;
  }
};

export default api;
