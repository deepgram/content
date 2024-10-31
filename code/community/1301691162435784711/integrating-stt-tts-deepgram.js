const WebSocket = require('ws');
require('dotenv').config();

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

// Connect to Deepgram STT WebSocket
const sttSocket = new WebSocket('wss://api.deepgram.com/v1/listen', {
  headers: { Authorization: `Token ${DEEPGRAM_API_KEY}` }
});

sttSocket.on('open', () => {
  console.log('STT WebSocket Connection Opened');
  sttSocket.send(JSON.stringify({ "content-type": "audio/wav", "interim_results": true }));
});

sttSocket.on('message', (data) => {
  console.log('STT Received:', data);
});

// Connect to Deepgram TTS WebSocket
const ttsSocket = new WebSocket('wss://api.deepgram.com/v1/speak', {
  headers: { Authorization: `Token ${DEEPGRAM_API_KEY}` }
});

ttsSocket.on('open', () => {
  console.log('TTS WebSocket Connection Opened');
  const ttsText = "Hello, this is a test using Deepgram's TTS.";
  ttsSocket.send(ttsText);
});

ttsSocket.on('message', (data) => {
  console.log('TTS Received Audio:', data);
});