# Resolving WebSocket API Audio Data Errors in Deepgram

When using Deepgram's WebSocket API for transcription services, users may encounter issues with their WebSocket connections closing unexpectedly. This typically results from improper handling of audio data being sent to the API.

### Common Errors and Solutions

Below are some errors that users might see in their logs, along with suggestions for resolving them:

#### 1. **Empty Audio Data**
- **Error Detail:** "Deepgram received an empty file or URL rather than valid audio data."
- **Solution:** Ensure that the audio data being sent is neither empty nor null. Verify that the source of your audio is correctly reading and transmitting the file.

#### 2. **Non-Audio Data Sent**
- **Error Detail:** "A non-audio file was sent to Deepgram."
- **Solution:** Confirm that the data format is appropriate. The file should be a supported audio format, such as WAV, MP3, or FLAC.

#### 3. **Base64 Encoding Issues**
- **Error Detail:** "The customer sent a base64 encoded audio file."
- **Solution:** Send raw, unencoded binary data, instead of base64 encoded files. This ensures that the WebSocket API can process the data correctly.

### Recommendations

If you are constructing your own WebSocket client and encountering issues, you might consider using Deepgram's JavaScript SDK. This SDK simplifies the WebSocket integration process and helps avoid common pitfalls associated with directly handling binary audio data using WebSockets.

Explore this [example application](https://github.com/deepgram/deepgram-js-sdk/tree/main/examples/node-live) to see how the SDK works.

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our [community for assistance](https://discord.gg/deepgram).

### References
- [Deepgram JS SDK on GitHub](https://github.com/deepgram/deepgram-js-sdk)
- [Node.js WebSocket Example](https://github.com/deepgram/deepgram-js-sdk/tree/main/examples/node-live)