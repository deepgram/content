# Resolving Empty Audio Errors with Deepgram API

When submitting audio data to the Deepgram API, receiving an error indicating that the file is empty or not a valid audio data can be a common issue. Here’s how you can ensure your audio file is correctly formatted and encoded to work with Deepgram.

## Understanding Deepgram's Audio File Requirements

Deepgram requires audio files to be sent as raw, unencoded binary data. Therefore, if your audio is **base64 encoded**, the API call will fail, generating an error. Below are some guidelines and code snippets that will help you properly format your audio data for successful transmission.

### Error Scenarios

1. **Empty Audio File** 
   - If an empty file is received, it may raise an error. Double-check the content of your audio file to ensure it contains valid audio data.

2. **Non-Audio File Format**
   - Non-audio files will result in errors. Confirm that the file extension and data are both audio-compatible.

3. **Base64 Encoded Audio**
   - Base64-encoded files are not supported. Ensure you send the file as unencoded binary data.

### Determine Your Audio Format

Use our [documentation](https://developers.deepgram.com/docs/determining-your-audio-format-for-live-streaming-audio#determining-your-audio-format) to identify your audio format. Properly configuring it is crucial for successful processing.

## Conclusion

By ensuring your audio files are in the correct format and encoding, you can effectively avoid these errors and optimize your use of the Deepgram API. This not only facilitates seamless transcription but also enhances the performance of your applications utilizing our services.

## References

- [Determining Your Audio Format](https://developers.deepgram.com/docs/determining-your-audio-format-for-live-streaming-audio#determining-your-audio-format)