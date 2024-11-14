// JavaScript code to check for job status using Deepgram API
// Requires installation of `@deepgram/sdk` via npm
// To run, replace placeholders with real values

const { Deepgram } = require('@deepgram/sdk');

const apiKey = process.env.DEEPGRAM_API_KEY;
const jobId = 'your-job-id';

const dgClient = new Deepgram(apiKey);

(async () => {
  try {
    // Fetch job status
    const response = await dgClient.transcription.get(jobId);
    console.log('Job status:', response.metadata.status);
    // Handle job status accordingly
  } catch (error) {
    console.error('Error:', error);
  }
})();