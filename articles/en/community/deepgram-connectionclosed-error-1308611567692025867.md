# Troubleshooting Deepgram ConnectionClosed Error

When using the Deepgram SDK, you might encounter an error with the message `ConnectionClosed: received 1011 (internal error) Deepgram did not receive audio data or a text message within the timeout window`. This guide provides steps to identify and resolve the issue.

## Understanding the Error
This error indicates that Deepgram has closed the connection because it didn't receive any audio data or text message within a specified timeout window. This can happen due to several reasons, such as network issues, incorrect SDK configuration, or problems with the audio data input itself.

## Troubleshooting Steps

### Check Network Connectivity

- Ensure your server or client machine maintains a stable network connection. Network interruptions can lead to timeouts where data isn't sent or received as expected.

### Verify Audio Source

- Confirm that the audio source is correctly configured to send data continuously. Interruptions or pauses in the audio stream can trigger timeouts.

### Adjust SDK Configuration

- Check the SDK's configuration parameters. In particular, if using options like `keepalive`, ensure they are set appropriately to maintain the connection. Try increasing the timeout window if possible.
- Ensure that `interim_results` is set correctly if needed, and that endpointing or any silence detection settings like `utterance_end_ms` are appropriately adjusted.

### Error Handling and Reconnection

- Implement a robust error-handling mechanism to manage dropped connections smoothly. Ensure that in the event of an error, your application attempts to reconnect successfully.

### Update Deepgram SDK

- Using the latest version of the SDK can sometimes resolve unforeseen bugs or issues. Ensure your SDK version is up-to-date.

## Seek Further Assistance
If the issue persists despite these troubleshooting steps, reach out to the community for support. You can join the conversation or start a discussion on our [Discord](https://discord.gg/deepgram) or [GitHub Discussions](https://github.com/orgs/deepgram/discussions).

## Conclusion
The `ConnectionClosed` error is typically a sign that something is preventing your application from consistently sending or receiving data within the expected time windows. By verifying network stability, checking audio source integrity, and adjusting your Deepgram SDK configurations, you can often resolve these issues and maintain a stable connection for your audio processing needs.

---

For documentation examples refer to:
- [Interim Results](https://developers.deepgram.com/docs/interim-results)
- [Keep Alive](https://developers.deepgram.com/docs/audio-keep-alive)
- [Utterance_End](https://developers.deepgram.com/docs/utterance-end)

For community support, please refer to:
- [Discord](https://discord.gg/deepgram) 
- [GitHub Discussions](https://github.com/orgs/deepgram/discussions).