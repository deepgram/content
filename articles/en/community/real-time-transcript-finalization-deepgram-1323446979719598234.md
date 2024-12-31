# Improving Real-Time Transcript Finalization with Deepgram APIs

## Enhancing the Real-Time Speech-to-Text API with Acknowledgement for Finalized Messages

Efficient real-time speech-to-text conversion is essential for many applications today. Deepgram provides a robust API allowing users to stream audio and receive transcriptions in real-time. However, a common concern arises when dealing with short audio segments or when needing precise confirmation of transcript finalization.

### Understanding the Finalize Message

The Deepgram real-time API allows users to send a `Finalize` message which signals the server to process any remaining audio data and deliver the final transcription results. According to [Deepgram documentation](https://developers.deepgram.com/docs/finalize#what-is-the-finalize-message), when a `Finalize` message is sent, the server processes any buffered audio and may respond with a finalized message indicating that it has completed this processing. This message includes a `from_finalize` attribute set to `true` if new transcript data is provided due to finalization.

### Key Behavior of the Finalize Message

- **Finalization Process**: Upon receiving a `Finalize` message, the server processes all buffered audio and returns final transcription results.
- **Finalized Response**: If there's significant audio buffered, the server sends a response marked by the `from_finalize` flag.
- **No Mandatory Acknowledgement**: Not every `Finalize` message will trigger a finalized response, especially if there's minimal or no buffered audio.

### User Requirement

For systems prioritizing prompt and complete transcript delivery, it’s crucial to confirm when the transcript data is indeed final. Users working with varying audio lengths may experience uncertainty if finalized messages aren’t consistently acknowledged with a response.

### Conclusion

Implementing a feature where every `Finalize` message is acknowledged, regardless of audio buffered, would help developers to confidently know when they have received all transcript data. Implementing this feature would allow for more predictable and reliable application behavior, optimizing user experience across various use cases.

For developers requiring consistent acknowledgment of finalization, it's worth closely monitoring any backlog of buffered audio and planning processing pipelines accordingly. If you have further insights or require tailored support, visit our [Discord community](https://discord.gg/deepgram) or contact your Deepgram support representative.

### References

- [Deepgram Finalize Message Documentation](https://developers.deepgram.com/docs/finalize#what-is-the-finalize-message)