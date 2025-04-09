# Audio Format Compatibility with Deepgram API

When using the Deepgram API for audio transcription or other services, it's essential to know which audio formats are compatible. Although the documentation highlights some common audio formats, like WAV and MP3, Deepgram actually supports over 100 different audio types, beyond what's listed.

## Testing Audio Formats

If you're unsure whether a specific audio format, such as `.3gp` or `.caf`, is supported, one practical approach is to test these files using Deepgram's [API Playground](https://playground.deepgram.com/?endpoint=listen&smart_format=true&language=en&model=nova-3). This tool allows you to upload and test audio files directly, providing immediate feedback on format compatibility as well as transcription results.

## Steps to Use the API Playground

1. **Visit the API Playground**: Go to [playground.deepgram.com](https://playground.deepgram.com/?endpoint=listen&smart_format=true&language=en&model=nova-3).
2. **Upload Your Audio File**: Use the interface to upload your `.3gp`, `.caf`, or any other audio file.
3. **Check Compatibility**: If the file processes successfully and returns a transcription, it's compatible with our API.

This method not only verifies format compatibility but also allows you to experiment with various API settings and see real-time results.

## Conclusion

While Deepgram supports numerous audio formats, not all are explicitly mentioned in the documentation. Testing your audio using the API Playground is a straightforward way to ensure compatibility and gain confidence in the transcription capabilities for less common formats.

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram

## References
- [Deepgram Supported Audio Formats](https://developers.deepgram.com/docs/supported-audio-formats)
- [Deepgram API Playground](https://playground.deepgram.com/?endpoint=listen&smart_format=true&language=en&model=nova-3)