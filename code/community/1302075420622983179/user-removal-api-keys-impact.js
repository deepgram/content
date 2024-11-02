const axios = require('axios');

// Get your Deepgram API key from the environment variables
const apiKey = process.env.DEEPGRAM_API_KEY;

// Deepgram API endpoint
const url = 'https://api.deepgram.com/v1/listen';

(async () => {
  try {
    // Make the HTTP POST request
    const response = await axios.post(url, null, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    // Check the status and print the response data
    if (response.status === 200) {
      console.log('Response:', response.data);
    } else {
      console.error('Request failed with status:', response.status);
    }
  } catch (error) {
    console.error('Error making request:', error);
  }
})();

// NOTE: Before running, ensure you have set the DEEPGRAM_API_KEY environment variable.