require('dotenv').config();
const { Deepgram } = require('@deepgram/sdk');

const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
const audioUrl = process.env.AUDIO_URL;

const deepgram = new Deepgram(deepgramApiKey);

(async () => {
  try {
    const response = await deepgram.transcription.preRecorded({
      url: audioUrl,
      options: {
        punctuate: true,
        noiseReduction: true // Enable noise reduction
      },
    });
    
    console.log('Transcription:', response.results.channels[0].alternatives[0].transcript);
  } catch (err) {
    console.error('Error:', err);
  }
})();