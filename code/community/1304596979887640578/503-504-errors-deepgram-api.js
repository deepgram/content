require('dotenv').config();
const fetch = require('node-fetch');

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
const PROJECT_ID = process.env.PROJECT_ID;

const url = 'https://api.deepgram.com/v1/listen';

async function transcribeAudio(audioUrl) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${DEEPGRAM_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: audioUrl,
            project: PROJECT_ID
        })
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Transcription:', data);
    } else {
        console.error('Error:', response.status, await response.text());
    }
}

// Example audio URL
const audioUrl = 'https://example.com/audiofile.mp3';

transcribeAudio(audioUrl);