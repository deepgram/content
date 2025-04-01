# Resolving 'Tasks Cancelled Error' in Deepgram's Async Live STT

When using Deepgram's async live Speech-to-Text (STT) service, users might encounter a "tasks cancelled error". This error generally arises when a WebSocket connection is unexpectedly closed or times out. This article outlines the common causes for this issue and provides potential solutions.

## Common Causes

1. **Connection Timeouts**: A short timeout setting might prematurely terminate the connection, especially if the audio being processed is lengthy.

2. **Corrupt or Unsupported Audio**: The WebSocket connection will fail if Deepgram detects unsupported or corrupt audio data.

3. **Network Issues**: Disruptions in network connectivity can lead to an abrupt closure of the connection.

## Solutions

1. **Increase Timeout Settings**: If you are working with a specific Deepgram SDK you can adjust the timeout settings. 
   Please see our SDK documentation to adjust the timeout as necessary based on the expected duration of audio playback.

2. **Use the Finalize Message**: Ensure all messages are processed by sending a finalize message over the WebSocket:
   ```json
   { "type": "Finalize" }
   ```
   This is useful to flush pending messages before closing the connection.

3. **Check Audio Formats**: Validate your audio data to ensure that it complies with Deepgram's required format specifications. Use tools like [ffmpeg](https://ffmpeg.org/) for audio format conversion if necessary.

4. **Adjust Endpointing and Utterance Settings**: Configure specific settings to prevent issues with transcription cutting off too soon. Parameters that can be adjusted include:
   ```python
   options = {
       "endpointing": 500,  // Adjust to suitable value
       "utterance_end_ms": 1000,
       "vad_events": True
   }
   ```
   Modifying these parameters can help prevent premature connection closures.

## Conclusion

Addressing the "tasks cancelled error" might involve tuning your connection settings, audio data formatting, or network reliability. Monitoring these aspects should minimize occurrences of this error. If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [Deepgram Discord Community](https://discord.gg/deepgram)

## References

- [Deepgram Documentation](https://developers.deepgram.com)
- [FFmpeg Documentation](https://ffmpeg.org)
- [Deepgram SDKs](https://developers.deepgram.com/docs/deepgram-sdks)
