const { Deepgram } = require('@deepgram/sdk');

const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
const deepgram = new Deepgram(deepgramApiKey);

const audioUrl = "YOUR_AUDIO_FILE_URL"; // Replace with your audio file URL

// Define transcription options, including custom 'mip_opt_out' parameter
const options = {
  mip_opt_out: true
};

async function transcribe() {
  try {
    const response = await deepgram.transcription.preRecorded({
      url: audioUrl
    }, options);
    console.log('Transcription success:', response);
  } catch (error) {
    console.error('Error transcribing:', error);
  }
}

transcribe();