require('dotenv').config();
const fetch = require('node-fetch');

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
const url = "https://api.deepgram.com/v1/speak";

const textToSpeak = "Hello, world!";

const headers = {
    "Authorization": `Bearer ${DEEPGRAM_API_KEY}`,
    "Content-Type": "application/json"
};

const body = JSON.stringify({
    text: textToSpeak,
    voice: "en-US"
});

fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
})
.then(response => {
    if (response.ok) {
        console.log("Text-to-Speech executed successfully");
    } else {
        console.log("Failed to execute Text-to-Speech");
    }
})
.catch(error => console.error('Error:', error));