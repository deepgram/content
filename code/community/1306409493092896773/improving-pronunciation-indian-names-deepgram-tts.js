const fetch = require('node-fetch');
require('dotenv').config();

// Set the API key from environment variables
const apiKey = process.env.DEEPGRAM_API_KEY;

// Set the API endpoint
const apiEndpoint = 'https://api.deepgram.com/v1/speak';

// Construct text with phonetic spelling to improve pronunciation
const text = "Prasanna (p-r-ah-s-a-n-n-a), Mangesh (m-uh-ng-ey-sh), Anil (ah-n-ee-l) are example names.";

// JSON payload
const payload = {
    text: text,
    voice: 'en-US' // Assuming the use of a US voice model
};

// Send POST request to Deepgram TTS API
fetch(apiEndpoint, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
})
.then(response => {
    if (response.ok) {
        console.log("Audio generated successfully.");
    } else {
        console.error(`Failed to generate audio: ${response.status}`);
    }
})
.catch(error => {
    console.error('Error:', error);
});