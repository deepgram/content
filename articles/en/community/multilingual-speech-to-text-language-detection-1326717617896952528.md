# Implementing Multilingual Speech-To-Text with Language Detection

When implementing a Speech-To-Text (STT) feature, especially for dynamic interfaces like search bars in applications resembling the ChatGPT App, it's crucial to consider language support. Deepgram provides robust STT capabilities, which perform exceptionally well for specific languages like English using streaming technology. However, incorporating multiple languages requires strategic consideration regarding automatic language detection.

## Language Detection for Streaming Audio

Deepgram provides automatic language detection, but it's currently supported only for pre-recorded audio, not for live streaming audio. This limitation means that for use cases requiring real-time response, such as a search bar, alternative strategies must be adopted for language support.

### Options for Multilingual Streaming STT

1. **Pre-recorded Audio with Language Detection:**
   - Record the user's speech and process it as a pre-recorded audio request. Although this might seem slow for real-time applications, Deepgram processes audio at impressive speeds, far less than real-time, providing transcriptions back efficiently.
   - Users can receive transcriptions in a couple of seconds or less, which might still be viable depending on the specific application requirements.

2. **User Language Selection:**
   - Enable users to select their preferred language manually before they begin speaking. This method bypasses the need for automatic detection, ensuring streaming STT can be utilized effectively across different languages.

## Conclusion

While automatic language detection for live audio streaming is not currently supported, viable workarounds can allow developers to implement effective multilingual STT features. Considering the application's dynamics and user experience is vital in choosing between pre-recorded audio processing with language detection and user-directed language selection.

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our [community](https://discord.gg/deepgram) for assistance.

### References
- [Deepgram Language Detection Documentation](https://developers.deepgram.com/docs/language-detection)
- Deepgram SDKs: [JavaScript](https://github.com/deepgram/deepgram-js-sdk), [Python](https://github.com/deepgram/deepgram-python-sdk), [Go](https://github.com/deepgram/deepgram-go-sdk), [.NET](https://github.com/deepgram/deepgram-dotnet-sdk), [Rust](https://github.com/deepgram/deepgram-rust-sdk)