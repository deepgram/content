const fetch = require('node-fetch');

// Configure your Deepgram API Key via an environment variable
const API_KEY = process.env.DEEPGRAM_API_KEY;

// Set the Deepgram endpoint for pre-recorded transcription
const url = 'https://api.deepgram.com/v1/listen';

async function transcribeAudio(audioUrl) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'url': audioUrl
        }),
        params: {
            'punctuate': true,
            'language': 'en',
            // Add other desired parameters here
        },
    });

    const data = await response.json();
    console.log("Final transcription:", data.results.channels[0].alternatives[0].transcript);
}

// Example audio source for transcription
transcribeAudio('https://example.com/audio.wav');