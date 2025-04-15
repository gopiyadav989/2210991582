const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;

// Configuration
const WINDOW_SIZE = 10; // Maximum number of numbers to store
const API_TIMEOUT = 500; // Timeout in milliseconds
const BASE_URL = 'http://20.244.56.144/evaluation-service';

// Store for different types of numbers
const numberStore = {
  p: [], // Prime numbers
  f: [], // Fibonacci numbers
  e: [], // Even numbers
  r: []  // Random numbers
};

// API endpoints for different number types
const apiEndpoints = {
  p: `${BASE_URL}/primes`,
  f: `${BASE_URL}/fibo`,
  e: `${BASE_URL}/even`,
  r: `${BASE_URL}/rand`
};

// Middleware to parse JSON
app.use(express.json());

// Endpoint to get numbers and calculate average
app.get('/numbers/:numberid', async (req, res) => {
  const startTime = Date.now();
  const { numberid } = req.params;
  
  // Validate number ID
  if (!['p', 'f', 'e', 'r'].includes(numberid)) {
    return res.status(400).json({ error: 'Invalid number ID. Use p, f, e, or r.' });
  }
  
  try {
    // Get current state of the window
    const windowPrevState = [...numberStore[numberid]];
    
    // Fetch numbers from third-party server with timeout
    let numbers = [];
    try {
      const response = await axios.get(apiEndpoints[numberid], {
        timeout: API_TIMEOUT
      });
      numbers = response.data.numbers || [];
    } catch (error) {
      console.error(`Error fetching ${numberid} numbers:`, error.message);
      // Continue with empty numbers array if fetch fails
    }
    
    // Filter out duplicates and add new unique numbers to the store
    const uniqueNumbers = numbers.filter(num => !numberStore[numberid].includes(num));
    
    // Update the store with new unique numbers
    for (const num of uniqueNumbers) {
      // If window size reached, remove the oldest number
      if (numberStore[numberid].length >= WINDOW_SIZE) {
        numberStore[numberid].shift();
      }
      numberStore[numberid].push(num);
    }
    
    // Calculate average of numbers in the window
    const sum = numberStore[numberid].reduce((acc, num) => acc + num, 0);
    const avg = numberStore[numberid].length > 0 ? sum / numberStore[numberid].length : 0;
    
    // Ensure response time is under 500ms
    const processingTime = Date.now() - startTime;
    if (processingTime > API_TIMEOUT) {
      console.warn(`Warning: Processing took ${processingTime}ms, which exceeds the target of ${API_TIMEOUT}ms`);
    }
    
    // Return the response
    return res.json({
      windowPrevState,
      windowCurrState: [...numberStore[numberid]],
      numbers,
      avg: parseFloat(avg.toFixed(2))
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Average Calculator server running on http://localhost:${PORT}`);
});
