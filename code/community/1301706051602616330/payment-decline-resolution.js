require('dotenv').config();
const { Deepgram } = require('@deepgram/sdk');

// Create a Deepgram SDK client
dgClient = new Deepgram(process.env.DEEPGRAM_API_KEY);

(async () => {
    const url = 'https://storage.googleapis.com/deepgram-demos/voicemail.mp3';
    const options = { language: 'en-US' };

    try {
        const response = await dgClient.transcription.preRecorded({ url }, options);
        console.log('Transcription:', response);
    } catch (err) {
        console.error('Error:', err);
    }
})();