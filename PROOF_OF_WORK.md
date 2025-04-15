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

Despite significant effort, we faced several challenges with the Social Media Analytics application:

- **API Integration Issues**: We encountered difficulties connecting to the required data sources due to authentication and CORS issues.
- **Data Processing Challenges**: The application structure was properly implemented, but we faced issues with data processing and state management.
- **Component Rendering**: While all components were created, there were issues with rendering the data correctly.

However, we did successfully implement:
- A complete React application structure with proper routing
- All required components:
  - UserCard: For displaying user information
  - PostCard: For displaying post information
  - LoadingState: A loading spinner component
  - ErrorState: An error message component with retry functionality
- Three main pages:
  - Top Users: Designed to display users with the most commented posts
  - Trending Posts: Designed to display posts with the highest comment counts
  - Feed: Designed to display real-time posts
- Error handling and loading states
- Responsive design using Material UI

The code structure is complete, but the application may not function as expected due to the mentioned issues.

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

The Average Calculator HTTP Microservice has been successfully implemented and tested, meeting all the requirements specified in the assignment.

For the Social Media Analytics Web Application, while we implemented the complete structure and components, we faced challenges with data integration and rendering. The code structure is in place, but the application may not function as expected.
