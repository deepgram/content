require('dotenv').config();
const WebSocket = require('ws');

// Retrieve the Deepgram API Key from environment variables
const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
const url = 'wss://api.deepgram.com/v1/listen';

const ws = new WebSocket(url, {
  headers: {
    Authorization: `Token ${deepgramApiKey}`
  }
});

ws.on('open', function open() {
  console.log('Connected to Deepgram API');
  // Example interaction
  ws.send('Your data or message here');
});

ws.on('message', function incoming(data) {
  console.log(`Received: ${data}`);
});

// Note: Ensure that the DEEPGRAM_API_KEY environment variable is correctly set.