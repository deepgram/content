require('dotenv').config();
const { Deepgram } = require('@deepgram/sdk');

const deepgramApiKey = process.env.DEEPGRAM_API_KEY;

const deepgram = new Deepgram(deepgramApiKey);

const options = {
    punctuate: true,
    encoding: 'mulaw',
    channels: 2,
    sample_rate: 8000,
    multichannel: true // Ensure multichannel is set to true for multiple channels
};

deepgram.transcription.preRecorded(options)
    .then((response) => {
        console.log('Live transcription started successfully:', response);
    })
    .catch((error) => {
        console.error('Error starting live transcription:', error);
    });

// For more about multichannel setup, refer to: https://developers.deepgram.com/docs/multichannel