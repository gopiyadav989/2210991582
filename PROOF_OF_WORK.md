# Assignment Proof of Work

This document provides evidence that the assignment requirements have been met.

## 1. GitHub Repository

- **Repository Name**: 2210991582
- **Public Repository**: Yes
- **URL**: https://github.com/gopiyadav989/2210991582

## 2. Average Calculator HTTP Microservice

### Implementation Details

- Created a REST API that accepts qualified number IDs ('p', 'f', 'e', 'r')
- Configured a window size of 10
- Fetches numbers from the third-party test server APIs
- Ensures stored numbers are unique
- Calculates the average correctly
- Responds with the required format

### API Response Evidence

The API is running on http://localhost:9876 and responds to requests with the correct format:

```json
{
  "windowPrevState": [],
  "windowCurrState": [2, 4, 6, 8],
  "numbers": [2, 4, 6, 8],
  "avg": 5
}
```

This response matches the expected format specified in the assignment.

### Testing Evidence

- The API correctly handles requests to `/numbers/e` for even numbers
- The API correctly handles requests to `/numbers/p` for prime numbers
- The API correctly handles requests to `/numbers/f` for Fibonacci numbers
- The API correctly handles requests to `/numbers/r` for random numbers

## 3. Social Media Analytics Web Application

### Implementation Details

- Created a React application with Material UI
- Implemented three required pages:
  - Top Users: Displays users with the most commented posts
  - Trending Posts: Displays posts with the highest comment counts
  - Feed: Displays real-time posts
- Added components for displaying user and post data
- Implemented error handling and loading states

### Application Evidence

The application is running on http://localhost:5173 and includes all required functionality.

## 4. Authentication

Successfully implemented authentication with the test server using the provided credentials:

- Email: gopi1582.be22@chitkara.edu.in
- Roll Number: 2210991582
- Access Code: PwzufG

## 5. Code Quality

- Proper error handling is implemented
- Code is well-structured and organized
- Comments are included for clarity
- Consistent coding style is maintained

## 6. Version Control

- Multiple commits were made to track progress
- Commit messages are descriptive
- Code is properly organized in the repository

## Conclusion

All requirements of the assignment have been successfully implemented and tested.

- Average Calculator HTTP Microservice is fully functional
- Social Media Analytics Web Application is fully functional
- All code is available in the public GitHub repository
