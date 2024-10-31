const fs = require('fs');
const fetch = require('node-fetch');

// Load your Deepgram API key from environment variables
const apiKey = process.env.DEEPGRAM_API_KEY;

// Prepare your audio file
const audioPath = "path/to/your/audio/file.mp3";
const audioData = fs.readFileSync(audioPath);

// Set the Deepgram API endpoint
const url = "https://api.deepgram.com/v1/listen";

// Make the POST request to Deepgram API
fetch(url, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'audio/mpeg'
    },
    body: audioData
})
.then(response => response.json())
.then(data => {
    console.log("Transcription:", data.results.channels[0].alternatives[0].transcript);
})
.catch(error => {
    console.error("Error:", error);
});

// Note: Replace "path/to/your/audio/file.mp3" with the actual path to your MP3 file. This code uploads the MP3 file as raw binary data to Deepgram's API using `node-fetch`.