require('dotenv').config();
const Deepgram = require('@deepgram/sdk');

const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
const projectID = process.env.PROJECT_ID;
const filePath = 'path/to/your/file.wav';  // Replace with actual file path

const deepgram = new Deepgram(deepgramApiKey);

async function getTranscription() {
  const response = await deepgram.transcription.preRecorded({
    buffer: filePath,
    settings: { punctuate: true },
  });
  const requestId = response.metadata.request_id;
  console.log(`Transcription done, request_id: ${requestId}`);
  return requestId;
}

async function getUsageCost(requestId) {
  let usageFound = false;
  
  while (!usageFound) {
    try {
      const usageResponse = await deepgram.usage.getRequest(projectID, requestId);
      if (usageResponse.data && usageResponse.data.cost) {
        console.log(`Cost for the request: ${usageResponse.data.cost}`);
        usageFound = true;
      }
    } catch (error) {
      console.error(`Error fetching usage: ${error.message}. Retrying in 5 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

async function main() {
  const requestId = await getTranscription();
  await getUsageCost(requestId);
}

main().catch(console.error);