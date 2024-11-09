// JavaScript example for Deepgram transcription using WebSocket

const WebSocket = require('ws');
require('dotenv').config();

const apiKey = process.env.DEEPGRAM_API_KEY;
const url = `wss://api.deepgram.com/v1/listen?endpointing=800&utterance_end_ms=2000`;

const ws = new WebSocket(url, { headers: { Authorization: `Token ${apiKey}` } });

ws.on('open', function open() {
  // Send a dummy audio buffer (replace with actual audio data)
  const dummyBuffer = Buffer.from([1, 2, 3, 4, 5]);
  ws.send(dummyBuffer);
});

ws.on('message', function message(data) {
  if (data.includes('"speech_final": true')) {
    console.log('Speech has ended based on speech_final flag.');
  } else if (data.includes('UtteranceEnd')) {
    console.log('Utterance has ended with no preceding speech_final.');
  }
});
// Reference: https://github.com/websockets/ws