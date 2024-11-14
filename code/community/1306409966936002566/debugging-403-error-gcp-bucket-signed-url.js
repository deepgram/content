require('dotenv').config();
const fs = require('fs');
const { Deepgram } = require('@deepgram/sdk');

const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
const deepgram = new Deepgram(deepgramApiKey);

const file = './audio-file.wav';

// Read audio file
const audio = fs.readFileSync(file);

// Transcribe audio
(async () => {
  try {
    const response = await deepgram.transcription.preRecorded(
      { buffer: audio, mimetype: 'audio/wav' },
      { language: 'en-US' }
    );
    console.log('Transcription:', response.results.channels[0].alternatives[0].transcript);
  } catch (error) {
    console.error('Error:', error);
  }
})();