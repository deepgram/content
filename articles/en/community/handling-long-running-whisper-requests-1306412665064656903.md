# Handling Long-Running Whisper Requests in Deepgram API

Deepgram's Whisper requests have a built-in timeout limit of 20 minutes. If a request exceeds this time limit, a 504 response code is typically returned, indicating a timeout. However, there can be instances where requests continue processing beyond this threshold, potentially impacting subsequent requests.

### Background
Deepgram's API is designed to handle transcription operations efficiently, but tasks that exceed the expected duration might lead to restrictions or delays in processing new requests. This is usually to maintain the system's overall efficiency and resource management.

### Resolution and Best Practices
If you are experiencing requests still processing beyond 20 minutes, there are a few strategies and best practices you can follow:

1. **Verification of Completed Requests**: Regularly check your dashboard or logs to confirm completion status. Such checks ensure you aren't waiting unnecessarily or duplicating requests.

2. **Minimize Request Duration**: For long audio files, consider breaking them into smaller segments to avoid hitting the timeout limit and improve processing efficiency.

3. **Contact Support**: If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram

4. **Keep Systems Updated**: Ensure that all SDKs and libraries used for interfacing with Deepgram's API are up-to-date. Updated SDKs may offer more robust handling of long-running requests.

### Conclusion
While the timeout feature is designed to maintain server efficiency, sometimes extra load or backlogs could lead to extended processing times. Monitoring request statuses, segmenting long audios, and regular communication with support are crucial in managing these situations effectively.

### References
- Deepgram API Documentation: [Getting Started](https://developers.deepgram.com/docs/getting-started)