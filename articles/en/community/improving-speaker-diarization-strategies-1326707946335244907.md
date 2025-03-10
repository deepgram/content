# Improving Speaker Diarization with Deepgram: Practical Strategies

Deepgram offers diarization capabilities designed to differentiate between speakers in audio files. While this feature is powerful, users may encounter challenges, especially with non-English languages in certain models like nova-phonecall and nova-medical. Below are strategies to enhance diarization results:

**Diarization Challenges:**
  
- **Inconsistent Speaker Detection with Nova-2:**
  The diarization feature can sometimes be unreliable when using the nova-2 model, leading to low accuracy in distinguishing speakers.
  
- **Language Limitations:**
  Models such as nova-phonecall and nova-medical may return errors when attempting diarization with languages other than English, due to the current limitations of supported languages.

**Strategies to Improve Diarization:**

1. **Prepend Audio from the Primary Speaker:**
   For audio files under 3 minutes, prepend a 30-second clip of the primary speaker's voice to assist the diarization model in identifying the speaker more accurately. [Help Center Documentation](https://deepgram.gitbook.io/help-center/faq/improving-diarization-by-prepending-audio-from-the-primary-speaker)

2. **Utilize Multichannel Audio:**
   Whenever possible, use multichannel audio, where each speaker is on a separate channel, to enhance the diarization accuracy. [Deepgram Docs](https://developers.deepgram.com/docs/diarization)

3. **Combine Multichannel with Diarization:**
   For improved results, accompany multichannel audio with diarization capabilities. This approach can assist in situations where diarization alone may struggle. [GitHub Discussion](https://github.com/orgs/deepgram/discussions/939)

4. **Use Longer Audio Files:**
   Diarization performance generally benefits from longer audio samples, so provide extended audio recordings when feasible.

5. **Ensure High Audio Quality:**
   The quality of audio significantly impacts diarization. Make efforts to maintain high-quality audio by avoiding degraded signals, such as those resulting from recording through computer speakers. [GitHub Discussion](https://github.com/orgs/deepgram/discussions/283)

**Conclusion**

By implementing these strategies, users can maximize the reliability and accuracy of Deepgram's diarization features. For ongoing support or if challenges persist, we recommend connecting with your Deepgram support representative or engaging with the community by visiting: [Deepgram Community](https://discord.gg/deepgram)

**References**

- [Deepgram's Diarization Documentation](https://developers.deepgram.com/docs/diarization)
- [Deepgram GitHub Discussions](https://github.com/orgs/deepgram/discussions)