# Troubleshooting Deepgram WebSocket API Disconnections

Integrating Deepgram’s WebSocket API for live audio streaming and transcription can sometimes lead to connection stability issues. If you find that your connection is established successfully but disconnects shortly after due to not receiving audio data within the expected timeout window, there are a few key aspects to consider when diagnosing and resolving these issues.

## Connection Issues with Deepgram WebSocket

When facing disconnection issues (error: 1011 indicating no audio data received within the timeout window), ensure that the following points are addressed:

1. **Ensure Proper Audio Transmission**:
   - Validate that your audio input stream is correctly capturing and transmitting data. You can check this using audio libraries like PyAudio to ensure the microphone is functioning correctly.
   - Send only non-empty audio packets. An empty audio packet can lead to immediate disconnection. Consider implementing logic to verify the packet size before sending.

2. **WebSocket Connection Setup**:
   - Verify that your WebSocket connection setup properly authenticates with Deepgram by including authorization tokens appropriately.
   - Configure WebSocket settings to avoid unintended timeouts.

3. **Handling Keep-Alive Messages**:
   - Consider sending `keep-alive` messages to maintain the WebSocket connection, but more importantly, ensure you're providing regular audio data.

4. **Audio Format Compliance**:
   - Check that the audio format is fully compliant with Deepgram’s requirements.

5. **Example of Validating Non-Empty Audio**:
   - Implement a check for non-empty audio packets before they are sent to the WebSocket:

## Conclusion

Addressing connection issues with Deepgram's WebSocket API involves ensuring the continuous and valid transmission of audio data, proper WebSocket configuration, and handling keep-alive messages correctly. If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [Deepgram Discord](https://discord.gg/deepgram).

## Additional Resources

- [Recovering From Connection Errors & Timeouts When Live Streaming](https://developers.deepgram.com/docs/recovering-from-connection-errors-and-timeouts-when-live-streaming-audio)
