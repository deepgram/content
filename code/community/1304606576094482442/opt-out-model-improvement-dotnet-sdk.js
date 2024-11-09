// JavaScript Node.js example using axios
// Ensure 'axios' library is installed: `npm install axios`

const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.DEEPGRAM_API_KEY;
const audioUrl = process.env.AUDIO_FILE_URL;

const url = 'https://api.deepgram.com/v1/listen?mip_opt_out=true';

axios.post(url, {
    url: audioUrl
}, {
    headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json'
    }
})
.then(response => {
    console.log('Transcription:', response.data);
})
.catch(error => {
    console.error('Failed to transcribe audio:', error.response.status);
});