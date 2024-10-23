const Deepgram = require('@deepgram/sdk');
const { Readable } = require('stream');
require('dotenv').config();

const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
const model = 'nova-2-medical';

const deepgram = new Deepgram(deepgramApiKey);

const audioSource = '<YOUR_AUDIO_SOURCE_URL>'; // URL to the audio file

// Function to transcribe audio
async function transcribe() {
    try {
        const response = await deepgram.transcription.preRecorded({
            url: audioSource
        }, {
            model: model,
            language: 'en-US'
        });

        console.log('Transcript:', response.results.channels[0].alternatives[0].transcript);
    } catch (error) {
        console.error('Error transcribing audio:', error);
    }
}

transcribe();