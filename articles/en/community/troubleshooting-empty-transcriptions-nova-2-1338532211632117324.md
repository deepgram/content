# Troubleshooting Empty Transcriptions with Deepgram's Nova Models

When using Deepgram's API with the nova-2 model, users might occasionally encounter an issue where correct transcriptions are initially received, but after approximately 8 minutes of streaming, the transcriptions return empty results with confidence dropping to zero. This typically occurs when dealing with sparse or intermittent audio input.

## Understanding the Issue

If you're sending small, sporadic audio chunks (such as 2-10 frames per minute), Deepgram may expect a more continuous audio input. Intermittent input might cause some models, including nova-2, to behave unexpectedly in returning results.

### Model Selection

For sparse or intermittent audio input, consider using the `nova` model instead of `nova-2`. The `nova` model is generally more robust for handling varying audio input patterns.

### API Logging and Analysis

To address this issue, it is recommended to:

- **Check API Logs**: Examine API usage logs in the Deepgram dashboard for warnings or errors.
- **Network Stability**: Ensure the network connection is stable to prevent intermittent request failures.
- **Audio Quality**: Verify the audio quality and format being used. Issues may arise with non-standard or low-quality audio inputs.

## Recommendations for Solutions

1. **Model Selection**: Use the `nova` model for sparse or intermittent audio input:
   ```json
   {
     "model": "nova",
     "smart_format": true
   }
   ```

2. **Audio Chunking**: If possible, send larger, more continuous chunks of audio data rather than sparse frames.

3. **Utilize Callbacks**: Implementing a callback mechanism may offer a better solution for managing intermittent input and ensuring timely and accurate results.

4. **Update and Use SDKs**: Ensure that any SDKs or libraries implemented are up-to-date to mitigate bugs or limitations in earlier versions. You can find Deepgram's SDKs on:
   - [JavaScript/TypeScript SDK](https://github.com/deepgram/deepgram-js-sdk)
   - [Python SDK](https://github.com/deepgram/deepgram-python-sdk)
   - [Go SDK](https://github.com/deepgram/deepgram-go-sdk)
   - [Dotnet SDK](https://github.com/deepgram/deepgram-dotnet-sdk)
   - [Rust SDK](https://github.com/deepgram/deepgram-rust-sdk)

### Further Assistance

If issues persist, or behavior continues to be inconsistent, reaching out to Deepgram support is recommended. Visit our community for more help: [Deepgram Discord Community](https://discord.gg/deepgram).

## Conclusion

For optimal use of Deepgram's API, especially with sparse or intermittent audio input, consider using the `nova` model and ensure your audio streams are properly chunked. Adapt APIs to make use of callback mechanisms for handling intermittent input scenarios.

Always ensure your implementation uses the most current SDK versions and follows best practices for network stability and audio quality.

---

### References
- [Deepgram Documentation](https://developers.deepgram.com/docs/getting-started-with-pre-recorded-audio)
- [Deepgram SDKs on GitHub](https://github.com/deepgram)
