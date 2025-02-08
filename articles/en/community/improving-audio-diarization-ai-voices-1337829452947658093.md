# Improving Audio Diarization for AI-Generated Voices

When working with AI-generated voices on Deepgram's transcription API, obtaining accurate speaker diarization can sometimes pose challenges. In these cases, all utterances may be attributed to a single speaker, even when different AI voices are used. Though this can be a stumbling block, there are strategies and considerations that might enhance diarization performance until new model updates are available.

### Factors Affecting Speaker Diarization

1. **Audio Quality:** The effectiveness of diarization can be significantly impacted by the quality of the audio. Ensuring clear, high-quality audio with minimal background noise and cross-talk will help improve results.

2. **Model Selection:** Deepgram offers various models, such as 'nova-2' and 'enhanced', that handle speaker separation differently. If one model does not meet expectations, testing with another supported model is recommended.

3. **Multi-Channel Audio:** Although not always feasible, using dual-channel audio can dramatically improve diarization accuracy. Each speaker is recorded on a separate channel, providing the model with clearer distinctions.

### Future Improvements

Deepgram is developing new diarization models aimed at improving the experience and accuracy for complex audio scenarios, including AI-generated voices. While the release timeline for this model is not yet available, users who can await these updates may find significant improvements.

### Interim Solutions

In the meantime, experimenting with different model and parameter combinations may yield better outcomes. Collaborating with Deepgram support specialists or exploring the community forums can also uncover insights and lesser-known configurations that have worked for other users.

### Support Channels

For enhanced guidance, users can reach out to Deepgram experts through the available community platforms or directly engage with support representatives for tailored assistance:
- [Deepgram Community on Discord](https://discord.gg/deepgram)

By considering these factors and options, users can optimize their use of the transcription service and potentially improve diarization results for AI voices.

### References

- [Deepgram Transcription API Documentation](https://developers.deepgram.com/docs/getting-started-with-pre-recorded-audio)
- [Deepgram GitHub Discussions](https://github.com/orgs/deepgram/discussions)