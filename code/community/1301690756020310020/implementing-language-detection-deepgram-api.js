const fs = require('fs');
const fetch = require('node-fetch');

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

async function transcribeAudio() {
  const audioData = fs.readFileSync('your_audio_file.mp3');

  const response = await fetch('https://api.deepgram.com/v1/listen', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${DEEPGRAM_API_KEY}`,
      'Content-Type': 'audio/mpeg',
    },
    qs: {
      detect_language: 'true',
    },
    body: audioData
  });
  
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

transcribeAudio().catch(console.error);