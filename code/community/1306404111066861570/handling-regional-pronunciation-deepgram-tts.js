const axios = require('axios');

// Make sure to set your API key as an environment variable
const apiKey = process.env.DEEPGRAM_API_KEY;

const url = 'https://api.deepgram.com/v1/speak';

const textPayload = {
  text: 'Hello, this is a test pronunciation of the name SpellingAlteration.'
};

axios.post(url, textPayload, {
  headers: {
    'Authorization': `Token ${apiKey}`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log('Request successful!');
  console.log('Audio response URL:', response.data.url);
})
.catch(error => {
  console.error('Request failed:', error);
});