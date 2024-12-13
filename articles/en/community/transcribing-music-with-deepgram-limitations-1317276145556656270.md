# Transcribing Music with Deepgram: Limitations and Recommendations

When using Deepgram's speech-to-text services, specifically the Nova-2 model for transcribing music files, it's crucial to understand the limitations and ideal use cases for accurate results.

### Background
Deepgram's models, including Nova-2, are primarily designed for transcribing human conversations. These models excel with clear speech in environments relatively free of background noises. This functionality is ideal for sources such as interviews, meetings, or spoken-word audio where speech clarity is significant.

### Challenges with Music Transcription
When attempting to transcribe music files such as MP3s:

- **Background Noise**: Music inherently contains background elements like instrumentation, crowd noises, and effects, which can significantly impact model performance when compared to conversational audio.
- **Model Design**: Deepgram’s models are not optimized for the complex audio inputs presented by music tracks. This limitation leads to frequent inaccuracies, such as missing words or sentences within the transcriptions.

### Recommendations
- **Use Conversational Audio**: Focus on audio types suited to Deepgram's capabilities. Supported formats include MP3, WAV, or FLAC containing clear spoken content.
- **Alternative Solutions**: If transcription goals primarily involve music, it may be beneficial to explore tools specifically designed for processing music files.

### Conclusion
For optimal performance with Deepgram’s transcription services, ensure that audio content is within the scope of conversational speech. If issues persist or the system behavior seems inconsistent, especially in use cases beyond typical input types, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [Deepgram Community](https://discord.gg/deepgram).

### References
- [Deepgram Documentation: Getting Started with Pre-Recorded Audio](https://developers.deepgram.com/docs/getting-started-with-pre-recorded-audio)