# Handling Transcription Hallucinations in Deepgram's Nova Models

When using Deepgram's transcription services, users may occasionally encounter what are known as "hallucinations" in the transcriptions provided by the models. These hallucinations manifest as transcribed text that does not correspond to any content in the audio file, such as random names or number patterns.

## Understanding Model Hallucinations

Hallucinations occur when the model generates words or phrases that were not present in the original audio. This can lead to unexpected entries like people's names or sequences of numbers appearing in the transcription output.

### Identifying the Issue

In reports of hallucinations, users have noted the appearance of names such as "Joshua Sandler" and sequences like "(zero zero six:fifty seven)" which were not present in the audio files being transcribed.

### Suggested Actions

   1. **Switch Models:** If you encounter hallucinations with nova-2, consider using the nova model. Users have reported fewer hallucinations when switching to this version. Adjust the model parameter in your API request as shown below:

      ```shell
      curl --location 'https://api.deepgram.com/v1/listen?smart_format=true&language=en&model=nova' \
      --header 'Content-Type: audio/mpeg' \
      --header 'Authorization: Token YOUR_API_KEY' \
      --data-binary '@/YOUR_FILE'
      ```

   2. **Review API Settings:** Use `smart_format=true` to automatically apply punctuation and paragraph formatting without needing to explicitly set `paragraphs` and `punctuate` to true.

   3. **Audio Quality:** Ensure your audio input is of good quality and properly formatted. Poor audio quality can sometimes lead to model hallucinations.

### Conclusion

Hallucinations in transcription are an acknowledged phenomenon when using advanced models such as nova-2, and can usually be mitigated by trying alternative models like nova. It is always good practice to evaluate the output when processing transcriptions and make model adjustments as necessary.

If the problem persists, or for more complex troubleshooting, reaching out to Deepgram's support or community channels can provide additional assistance: [Deepgram Community](https://discord.gg/deepgram).

### References

- [Deepgram API Documentation: Nova Streaming](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio)
- [Deepgram Community Github Discussions](https://github.com/orgs/deepgram/discussions)