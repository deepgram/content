const WebSocket = require('ws');
const fs = require('fs');

const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
const audioFilePath = process.env.AUDIO_FILE_PATH;

const ws = new WebSocket('wss://api.deepgram.com/v1/listen', {
  headers: {
    Authorization: `Token ${deepgramApiKey}`
  }
});

ws.on('open', () => {
  const readStream = fs.createReadStream(audioFilePath);
  readStream.on('data', (chunk) => {
    ws.send(chunk);
  });

  readStream.on('end', () => {
    ws.close();
  });
});

ws.on('message', (data) => {
  const transcript = JSON.parse(data);
  console.log(transcript);
});