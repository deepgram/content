# Resolving 'Tasks Cancelled Error' in Deepgram Async Live STT

When using Deepgram's async live Speech-to-Text (STT) service, encountering a 'tasks cancelled error' can be perplexing. This error often arises when a WebSocket connection is unexpectedly terminated or experiences a timeout.

## Potential Causes

1. **Connection Timeouts**: The connection may terminate prematurely if the timeout setting is inadequate for the duration of audio being processed.

2. **Corrupt or Unsupported Audio**: If audio data is corrupt or in an unsupported format, Deepgram might close the connection.

3. **Network Issues**: Poor network connectivity could lead to connection disruptions.

## Solutions to Consider

1. **Adjust Timeout Settings**: Increasing the timeout settings can help if you're using a specific client that supports timeout configuration. For example:
   ```plaintext
   Increase timeout settings if using .NET or other clients that support this function.
   ```

2. **Send a Finalize Message**: To ensure all pending messages are processed before closing the connection, send a finalize message:
   ```json
   { "type": "Finalize" }
   ```

3. **Verify Audio Format**: Ensure the formatting of audio data matches the supported specifications to avoid processing errors.

4. **Configure Endpointing and Utterance Settings**: Adjust these settings if cutting off transcriptions prematurely is an issue:
   ```plaintext
   Configure endpointing and utterance settings according to the required durations and structures.
   ```

## Conclusion

While these steps may provide a solution, system errors can occasionally arise from more complex underlying issues. If troubleshooting is unsuccessful, we recommend reaching out to your Deepgram support representative or visiting our community for more detailed investigation and assistance: https://discord.gg/deepgram

## References

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram

For more details on WebSocket implementation visit the [Deepgram Documentation](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio). For further technical assistance, visit the [GitHub Discussions](https://github.com/orgs/deepgram/discussions) or [Discord](https://discord.gg/deepgram).