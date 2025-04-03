# Improving Transcription for Soft and Unclear Speech

When dealing with speech transcription, particularly when audio is faint or unclear, there are several approaches you can take to improve the quality of the output. Here are some strategies and options to enhance transcription outputs, especially in challenging environments:

## Choose the Right Model
Deepgram offers various models optimized for different use cases. Selecting the appropriate model can significantly impact transcription accuracy:
- **nova-2-general**: Recommended for general purposes.
- **nova-2-phonecall**: Optimized for lower-quality audio, such as phone calls.
- **nova-3**: The latest model, incorporating advanced features.

Learn more about Deepgram models and their use cases in the [Model and Language Overview](https://developers.deepgram.com/docs/models-languages-overview).

## Keyword Boosting and Keyterms
- **Keyword Boosting** is a feature that helps Deepgram focus on specific words during transcription, beneficial for ensuring the capture of easily missed words, like softly spoken phrases. This is available in all models except nova-3.
- **Keyterms**: With nova-3, utilize Keyterms, which are more advanced than Keyword Boosting, to enhance recognition of specific words.

Explore more on [Keyword Boosting](https://developers.deepgram.com/docs/keywords) and [Keyterms](https://developers.deepgram.com/docs/keyterm).

## Improve Audio Quality
- **Microphones**: Using high-quality microphones or ensuring the speaker is close to the microphone can improve transcription results noticeably.
- **Hardware Considerations**: Consider different hardware options, like avoiding noise-canceling headphones if they produce lower-quality audio.

## Noise Suppression
For environments with significant background noise, implementing noise suppression before audio is processed by Deepgram can help:
- **Open-source solutions** and free services provide basic noise suppression.
- **Commercial tools** such as [krisp.ai](http://krisp.ai) offer advanced noise cancellation.

## Diarization for Multi-Speaker Environments
In scenarios where multiple speakers are involved, using diarization can assist in distinguishing between different speakers, thereby improving transcription accuracy.

### Conclusion
By leveraging these strategies and tools, you can enhance the accuracy of transcriptions even when dealing with soft or unclear speech. If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: [Deepgram Community](https://discord.gg/deepgram).

### References
- [Deepgram Model and Language Overview](https://developers.deepgram.com/docs/models-languages-overview)
- [Deepgram Keyword Boosting](https://developers.deepgram.com/docs/keywords)
- [Deepgram Keyterms](https://developers.deepgram.com/docs/keyterm)
- [Krisp.ai](http://krisp.ai)