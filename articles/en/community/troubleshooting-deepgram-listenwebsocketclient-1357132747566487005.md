# Troubleshooting Deepgram ListenWebSocketClient issues

When using Deepgram's ListenWebSocketClient, users may sometimes encounter a situation where no messages are received after connecting and sending audio packets. This guide provides potential solutions and configurations to ensure smooth operation of Deepgram's API for live streaming audio transcription.

## Initial Setup and Configuration

Ensure that all required parameters are correctly set when establishing a WebSocket connection. The Deepgram live transcription API requires specific configuration, particularly `encoding` and `sample_rate`, to process and transcribe audio data correctly.

### Required Parameters

- **Encoding**: Specify the `encoding` of your audio packets. For example, when dealing with mulaw (often used in telephony), set `encoding=mulaw`.
- **Sample Rate**: Indicate the `sample_rate` of your audio. This should match the audio stream's sample rate, typically `8000` Hz for telephony audio.

These parameters should be included in your query parameters when opening the WebSocket connection.

### Common Errors

1. **Missing `encoding` and `sample_rate`:**
   - **Error:** "Raw binary data was sent to Deepgram without both the `encoding` and `sample_rate` set."
   - **Solution:** Double-check your query parameters to ensure both `encoding` and `sample_rate` are correctly defined.

2. **Non-audio Data Received:**
   - **Error:** "A non-audio file was sent to Deepgram."
   - **Solution:** Verify that the data being sent is indeed audio. This may involve checking your data serialization process or any preprocessing steps before transmission.

## Debugging and Support

- **Use the SDK Logs:** Deepgram SDKs often provide logging options that can help identify issues with the transmitted audio or parameter configurations. Ensure logging is enabled and review logs to trace the API communication.

- **Reach Out for Help:** If issues persist or system behavior seems inconsistent, contact your Deepgram support representative (if you have one), or visit our community for assistance: https://discord.gg/deepgram.

## Conclusion

Properly configuring your WebSocket client with the correct audio settings is crucial to ensuring accurate transcriptions with Deepgram's API. Make sure to follow the guidelines for setting essential parameters and utilize available debugging resources to troubleshoot issues quickly.

## References
- [Deepgram Live Streaming Audio API Documentation](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio)