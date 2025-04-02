# Troubleshooting Deepgram WebSocket API Audio Data Errors

When using Deepgram's WebSocket API, you may encounter issues such as the connection being closed unexpectedly. This can often be traced back to the format or type of audio data being sent. Below, we outline the important points to consider when sending audio data via the WebSocket API and how to troubleshoot common errors.

### Potential Issues with Audio Data

1. **Empty Audio Files**
   - If Deepgram receives an empty file or URL, it cannot process the audio. Ensure that the audio data you send is not empty or null.

2. **Non-Audio File Sent**
   - Deepgram requires valid audio data to process. Sending a non-audio file or mislabeled data could result in errors.

3. **Incorrect Audio Encoding**
   - Do not send base64 encoded audio files. The Deepgram API requires raw, unencoded binary data.

### Using the Deepgram JS SDK

If you are not currently using the [Deepgram JS SDK](https://github.com/deepgram/deepgram-js-sdk), it is recommended for handling WebSocket connections more seamlessly with Deepgram's Speech-to-Text service. The SDK abstracts much of the complexity involved in setting up and managing the WebSocket connection, ensuring that audio data is transmitted correctly.

Here's a link to an [example application](https://github.com/deepgram/deepgram-js-sdk/tree/main/examples/node-live) that demonstrates how to use the SDK for live transcriptions with WebSockets.

```
Mermaid Diagram Placeholder:

Example Flowchart for WebSocket Audio Data Transmission:

graph LR
    A[Connect to WebSocket] --> B[Send Raw Audio Data] --> C{Is Data Properly Formatted?}
    C -->|Yes| D[Transcription Successful]
    C -->|No| E[Format Error]
    E --> F[Check Audio Data Formatting]
```

### Conclusion

Ensuring that your audio data is formatted and transmitted correctly is crucial for success with Deepgram's WebSocket API. By following the guidelines above and utilizing the Deepgram SDK, you can minimize errors and enhance your audio processing capabilities. If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram

### References

- [Deepgram JS SDK](https://github.com/deepgram/deepgram-js-sdk)
- [Example Node Live WebSocket Application](https://github.com/deepgram/deepgram-js-sdk/tree/main/examples/node-live)