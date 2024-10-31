// Node.js example for using Deepgram's real-time streaming API with keyword boosting
// Requires the `deepgram-sdk` npm package

const Deepgram = require('@deepgram/sdk');

// Initialize Deepgram with your API key
const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
const deepgram = new Deepgram(deepgramApiKey);

// Options for real-time transcription
const options = {
    punctuate: true,
    keywords: ["JAY", "HAYWIRE"]
};

// Function to handle streaming
async function streamAudio() {
    const response = await deepgram.transcription.live(options);

    response.on('open', () => {
        console.log('Connection opened');
    });

    response.on('transcriptReceived', (data) => {
        console.log('Transcript:', data.channel.alternatives[0].transcript);
    });

    response.on('close', () => {
        console.log('Connection closed');
    });
}

streamAudio();

// Note: Ensure you have a method to send audio data to this script