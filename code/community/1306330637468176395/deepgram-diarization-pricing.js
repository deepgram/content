const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.DEEPGRAM_API_KEY;
const audioUrl = process.env.AUDIO_URL;

async function transcribeAudio() {
    try {
        const response = await axios.post('https://api.deepgram.com/v1/listen', {
            url: audioUrl,
            diarize: true,
        }, {
            headers: {
                'Authorization': `Token ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Transcription result:', response.data);
    } catch (error) {
        console.error('Error:', error.response.status, error.response.data);
    }
}

transcribeAudio();