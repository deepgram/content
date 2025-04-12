# Troubleshooting RTMP Streaming Timeout Issues with Deepgram

When streaming audio to Deepgram via RTMP and encountering a `1011` error code with a `NET-0001` payload, it indicates that Deepgram did not receive any audio data within the timeout window. This guide provides troubleshooting steps to address this issue.

**Understanding Error Code 1011**

The `1011` error arises when there is no audio data sent to Deepgram within a specified timeframe after opening a WebSocket connection. This can occur due to the following reasons:

1. **Delayed Audio Transmission**: There is a delay in sending audio data, causing Deepgram to not receive audio within 10 seconds of the WebSocket connection opening. Ensure your system sends audio immediately to avoid timeouts.

2. **Audio Data Completion**: If all intended audio has been sent but Deepgram awaits more context (e.g., for accuracy in short utterances), ensure to send a `CloseStream` message to finalize and process the received audio.

3. **Network Issues**: Network connectivity problems may prevent audio data from reaching Deepgram.

**Troubleshooting Steps**

1. **Send Silent Audio**: If there's a delay in your system preparing to send audio, consider sending silent audio initially since Deepgram can process this as an empty transcript without dropping the connection.

2. **Implement KeepAlive Messages**: Although essential for maintaining the connection, remember KeepAlive alone will not suffice to keep the WebSocket open initially. Ensure at least one message from Deepgram is received to validate connection consistency.

3. **Test Network Connectivity**: Use cURL to request a transcript with a Deepgram-hosted audio file to verify network communication. See our [guide on generating transcripts from the terminal](https://developers.deepgram.com/docs/generating-and-saving-transcripts-from-the-terminal) for steps.

4. **Network Traffic Analysis**: Use a packet sniffer or network analysis tool such as [Wireshark](https://www.wireshark.org/) to examine if audio data leaves your network correctly.

**Conclusion**

Following these guidelines will help diagnose and resolve timeout issues with RTMP streaming to Deepgram. Ensure your setup is configured to send audio promptly after connection, and verify network integrity to maintain consistent streaming.

**Additional Resources**

- [Deepgram Websockets Documentation](https://developers.deepgram.com/reference/streaming)
- [Wireshark](https://www.wireshark.org/)
- [Generating Transcripts from the Terminal](https://developers.deepgram.com/docs/generating-and-saving-transcripts-from-the-terminal)

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram