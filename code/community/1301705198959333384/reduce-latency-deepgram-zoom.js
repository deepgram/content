const Deepgram = require('@deepgram/sdk');
const WebSocket = require('ws');

// Set your Deepgram API key and audio source
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
const AUDIO_SOURCE = 'your-zoom-websocket-url';

// Initialize the Deepgram SDK
const deepgram = new Deepgram(DEEPGRAM_API_KEY);

// Configure WebSocket to receive audio stream
const ws = new WebSocket(deepgram.transcription.live({
  url: AUDIO_SOURCE,
  config: {
    punctuate: true,
    interimResults: true
  }
}));

// Handle incoming messages
ws.on('message', (message) => {
  const parsedMessage = JSON.parse(message);
  if (parsedMessage.is_final) {
    console.log(`Transcript: ${parsedMessage.channel.alternatives[0].transcript}`);
  }
});

// Handle WebSocket errors
ws.on('error', (error) => {
  console.error(`WebSocket error: ${error}`);
});

// Close WebSocket connection
process.on('SIGINT', () => {
  ws.close();
  process.exit();
});

// Links to further resources, like Deepgram JS SDK documentation, can be added here.