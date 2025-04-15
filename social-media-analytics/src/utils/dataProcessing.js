/**
 * Utility functions for processing social media data
 */

// Get random image URL for users
export const getUserImageUrl = (userId) => {
  // Using random user images from a placeholder service
  return `https://randomuser.me/api/portraits/${userId % 2 === 0 ? 'men' : 'women'}/${userId % 70 || 1}.jpg`;
};

// Get random image URL for posts
export const getPostImageUrl = (postId) => {
  // Using random images from a placeholder service
  return `https://picsum.photos/seed/${postId}/400/300`;
};

// Process users data to get top users with most commented posts
export const getTopUsers = (users, postsData, commentsData) => {
  // Create a map to store user data with comment counts
  const userCommentCounts = new Map();
  
  // Initialize all users with 0 comments
  Object.entries(users).forEach(([userId, userName]) => {
    userCommentCounts.set(userId, {
      userId,
      userName,
      totalComments: 0,
      posts: []
    });
  });
  
  // Count comments for each user's posts
  Object.entries(postsData).forEach(([userId, posts]) => {
    const userData = userCommentCounts.get(userId);
    if (userData) {
      let userTotalComments = 0;
      
      posts.forEach(post => {
        const postComments = commentsData[post.id] || [];
        const commentCount = postComments.length;
        userTotalComments += commentCount;
        
        userData.posts.push({
          ...post,
          commentCount
        });
      });
      
      userData.totalComments = userTotalComments;
    }
  });
  
  // Convert map to array and sort by total comments (descending)
  const sortedUsers = Array.from(userCommentCounts.values())
    .sort((a, b) => b.totalComments - a.totalComments);
  
  // Return top 5 users
  return sortedUsers.slice(0, 5);
};

// Process posts data to get trending posts (posts with maximum comments)
export const getTrendingPosts = (postsData, commentsData) => {
  // Flatten all posts into a single array
  const allPosts = Object.entries(postsData).flatMap(([userId, posts]) => 
    posts.map(post => ({
      ...post,
      userName: post.userName || 'Unknown User', // Ensure userName is available
      commentCount: (commentsData[post.id] || []).length
    }))
  );
  
  // Find the maximum comment count
  const maxCommentCount = Math.max(...allPosts.map(post => post.commentCount), 0);
  
  // Filter posts with the maximum comment count
  return allPosts
    .filter(post => post.commentCount === maxCommentCount)
    .sort((a, b) => b.id - a.id); // Sort by post ID (descending) for consistency
};

// Process posts data to get feed (newest posts first)
export const getFeedPosts = (postsData, commentsData) => {
  // Flatten all posts into a single array
  const allPosts = Object.entries(postsData).flatMap(([userId, posts]) => 
    posts.map(post => ({
      ...post,
      userName: post.userName || 'Unknown User', // Ensure userName is available
      commentCount: (commentsData[post.id] || []).length
    }))
  );
  
  // Sort by post ID (descending) to get newest posts first
  // Assuming higher IDs are newer posts
  return allPosts.sort((a, b) => b.id - a.id);
};
