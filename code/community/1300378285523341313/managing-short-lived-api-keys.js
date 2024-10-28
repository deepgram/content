const axios = require('axios');

// Function to request a short-lived API key
async function requestApiKey() {
    const response = await axios.post('https://api.your-service.com/generate-key', {}, {
        headers: {
            'Authorization': `Bearer ${process.env.ADMIN_API_KEY}`
        }
    });
    return response.data.api_key;
}

// Function to delete an API key
async function deleteApiKey(apiKey) {
    await axios.delete(`https://api.your-service.com/delete-key/${apiKey}`, {
        headers: {
            'Authorization': `Bearer ${process.env.ADMIN_API_KEY}`
        }
    });
}

(async () => {
    // Request a new API key
    const apiKey = await requestApiKey();
    console.log(`API Key: ${apiKey}`);

    // Use the API key...

    // Delete the API key after use
    await deleteApiKey(apiKey);
})();

// Ensure to set ADMIN_API_KEY in your environment variables.