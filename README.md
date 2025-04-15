# Assignment Submission

This repository contains two projects:

1. **Social Media Analytics** - A React-based frontend web application that delivers real-time analytical insights from a social media platform.
2. **Average Calculator** - A microservice that calculates the average of different types of numbers fetched from a third-party server.

## Project Structure

- `/social-media-analytics` - Contains the React frontend application
- `/average-calculator` - Contains the backend microservice

## Technologies Used

### Social Media Analytics
- React with Vite
- Material UI
- Axios for API requests

### Average Calculator
- Node.js
- Express
- Axios for API requests

## How to Run

### Average Calculator HTTP Microservice
1. Navigate to the average-calculator directory:
   ```
   cd average-calculator
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run the server:
   ```
   node minimal-server.js
   ```
4. The server will be available at http://localhost:9876

### Social Media Analytics Web Application
1. Navigate to the social-media-analytics directory:
   ```
   cd social-media-analytics
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. The application will be available at http://localhost:5173

## Testing the Average Calculator API

You can test the Average Calculator API using curl or a web browser:

### Using curl:
```
curl http://localhost:9876/numbers/e  # For even numbers
curl http://localhost:9876/numbers/p  # For prime numbers
curl http://localhost:9876/numbers/f  # For Fibonacci numbers
curl http://localhost:9876/numbers/r  # For random numbers
```

### Using a web browser:
Visit the following URLs:
- http://localhost:9876/numbers/e
- http://localhost:9876/numbers/p
- http://localhost:9876/numbers/f
- http://localhost:9876/numbers/r

## Screenshots

### Average Calculator API Response
![Average Calculator API Response](screenshots/average-calculator.png)

### Social Media Analytics Web Application
![Social Media Analytics - Top Users](screenshots/social-media-top-users.png)
![Social Media Analytics - Trending Posts](screenshots/social-media-trending-posts.png)
![Social Media Analytics - Feed](screenshots/social-media-feed.png)

## Author
- Roll Number: 2210991582
- Name: Gopi Yadav
- Email: gopi1582.be22@chitkara.edu.in
