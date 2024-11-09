const fs = require('fs');
const { Deepgram } = require('@deepgram/sdk');

const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
const deepgram = new Deepgram(deepgramApiKey);

const file = fs.readFileSync('path/to/your/audiofile.wav');

async function transcribeAudio() {
  try {
    const response = await deepgram.transcription.preRecorded({
      buffer: file,
      mimetype: 'audio/wav',
    });
    console.log('Transcription:', response.results.channels);
  } catch (error) {
    console.error('Error:', error);
  }
}

transcribeAudio();
