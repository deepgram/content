require('dotenv').config();
const deepgram = require('@deepgram/sdk');

// Retrieve API key from environment variables
const apiKey = process.env.DEEPGRAM_API_KEY;

// Initialize Deepgram SDK client
const deepgramClient = new deepgram.Deepgram(apiKey);

// Function to simulate API key deletion logic
async function deleteApiKey(keyId) {
    console.log(`Deleting API key with id: ${keyId}`);
    // Insert actual API key deletion logic here using your own backend or management service
}

// Example usage
(async () => {
    const keyId = process.env.DEEPGRAM_KEY_ID;
    // Assume the API key is used here
    
    // Delete the API key immediately after use
    await deleteApiKey(keyId);
})();

// Ensure to have DEEPGRAM_API_KEY and DEEPGRAM_KEY_ID in your `.env` file.