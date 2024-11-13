const axios = require('axios');
require('dotenv').config();

// Load environment variables
const apiKey = process.env.DEEPGRAM_API_KEY;
const audioUrl = process.env.AUDIO_URL;

// API endpoint
const url = 'https://api.deepgram.com/v1/listen';

// Request options
const options = {
  headers: {
    'Authorization': `Token ${apiKey}`,
    'Content-Type': 'application/json'
  }
};

const payload = {
  url: audioUrl,
  diarize: true
};

// Make the API request
axios.post(url, payload, options)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });