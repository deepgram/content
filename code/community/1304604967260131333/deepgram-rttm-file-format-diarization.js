const fetch = require('node-fetch');
require('dotenv').config();

const apiKey = process.env.DEEPGRAM_API_KEY;
const audioUrl = 'https://your-audio-file-url.com/audio.wav';

async function transcribeAudio() {
  const response = await fetch('https://api.deepgram.com/v1/listen', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: audioUrl,
      diarize: true,
      punctuate: true,
    }),
  });

  const data = await response.json();
  console.log(data);
}

transcribeAudio().catch(console.error);