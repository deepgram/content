# Handling Missing Final Transcripts in Streaming Transcription

When using Deepgram's streaming transcription service, users may encounter issues where they do not receive a final transcript, particularly in scenarios involving extensive speech with background noise. This documentation provides guidance on how to handle such instances effectively.

### Understanding the Issue
In some cases, while using the streaming API with interim results enabled, users may notice that a final transcript is not generated even after a significant amount of speech input. This behavior can occur in environments where background noise is present, which can affect the transcription process.

### Recommended Solutions
To tackle the problem of missing final transcripts, consider the following approaches:

1. **Monitor for Pending Interim Results:**
   - Keep track of situations where you receive interim results without a corresponding final result (`is_final=True`). This can help you identify instances where the transcription is incomplete.

2. **Utilize `auto_flush_reply_delta`:**
   - You can enable the `auto_flush_reply_delta` feature with a specified number of milliseconds to automatically send a flush command. This can help finalize the transcription without closing the websocket connection. If enabling it does not suit your use case, you can manage interim results manually.

3. **Manual Flush Management:**
   - If `auto_flush_reply_delta` is not desirable, manually monitor for outstanding interim results. If you detect that a final result has not been received within your defined time constraints, you should call the `Flush` method to ensure the transcription is finalized.

   - This method is particularly useful for scenarios such as push-to-talk, where audio bytes are not continuously streamed, and there is a need to finalize the buffer of pending transcriptions.

### Conclusion
Handling missing final transcripts in a noisy background environment requires proactive management of interim results and strategic use of flushing mechanisms. By implementing these solutions, you can enhance the reliability and accuracy of your transcription process.

For further assistance or if you experience other issues, you are encouraged to join and participate in our [Deepgram Discord community](https://discord.gg/deepgram) or [GitHub Discussions](https://github.com/orgs/deepgram/discussions). Here, you can engage with community members and Deepgram experts who can offer additional guidance.

### References
- [Deepgram Discord Community](https://discord.gg/deepgram)
- [GitHub Discussions](https://github.com/orgs/deepgram/discussions)
- [SDK Client Options](https://developers.deepgram.com/docs/using-client-options-with-sdks)