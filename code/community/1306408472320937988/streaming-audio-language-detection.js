require('dotenv').config();
const WebSocket = require('ws');

const API_KEY = process.env.DEEPGRAM_API_KEY;
const ws = new WebSocket('wss://api.deepgram.com/v1/listen?model=multi', {
    headers: {
        'Authorization': `Token ${API_KEY}`
    }
});

ws.on('open', function open() {
    console.log('Connected to Deepgram server');
    
    // Replace with your own audio stream
    ws.send('Your audio stream chunk here');
});

ws.on('message', function incoming(data) {
    console.log(`Received: ${data}`);
});

// Ensure you have .env file with DEEPGRAM_API_KEY
// And replace 'Your audio stream chunk here' with actual data