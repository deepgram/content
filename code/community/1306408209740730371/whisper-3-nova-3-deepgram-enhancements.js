// Import the required modules
const fs = require('fs');
const fetch = require('node-fetch');

// Define environment variables
const API_KEY = process.env.DEEPGRAM_API_KEY;
const FILE_PATH = 'your_audio_file_path.wav';

// Ensure API Key is available
if (!API_KEY) {
    console.error('DEEPGRAM_API_KEY environment variable must be set.');
    process.exit(1);
}

// Read audio file
const audioData = fs.readFileSync(FILE_PATH);

// Prepare request options
const options = {
    method: 'POST',
    headers: {
        'Authorization': `Token ${API_KEY}`,
        'Content-Type': 'audio/wav',
    },
    body: audioData
};

// Function to transcribe audio
async function transcribeAudio() {
    try {
        const response = await fetch('https://api.deepgram.com/v1/listen', options);
        const data = await response.json();

        if (response.ok) {
            console.log('Transcription results:', data);
        } else {
            console.error(`Error: ${response.status} - ${data.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

transcribeAudio();