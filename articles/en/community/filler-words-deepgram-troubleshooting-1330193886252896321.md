# Enabling and Troubleshooting Filler Words in Deepgram's Transcription

When working with Deepgram's transcription services, users often seek to include filler words such as "um," "uh," or "mm" in their transcriptions. This functionality is particularly useful for creating more natural transcriptions that capture the nuances of spoken language.

## Enabling Filler Words

To enable the transcription of filler words in Deepgram's services, you need to set the `filler_words=true` parameter in your API request. This request can be applied to both pre-recorded and streaming audio, but it's important to note that this feature currently supports English language audio only.

### API Example

For those using Deepgram's API, ensure your request includes the correct parameter:

- **API Endpoint**: Use `https://api.deepgram.com/v1/listen` for regular transcription or `wss://api.deepgram.com/v1/listen` for live transcription.
- **Parameter**: Append `filler_words=true` to your request to enable this feature.

More detailed documentation on setting this parameter and its use can be found in our [filler words documentation](https://developers.deepgram.com/docs/filler-words).

## Troubleshooting Missing Filler Words

Despite enabling filler words, there can be situations where some filler words are not captured accurately:

1. **Audio Clarity**: Ensure your audio is clear and free from background noise or cross-talk. Clean and well-recorded audio increases transcription accuracy.
2. **Audio Length**: Testing with a variety of audio clips can provide better results. Short clips may not always give a representative sample.
3. **Model Confidence**: Occasionally, the model's confidence in detecting filler words may affect transcription. Trying different audio samples can help.
4. **Supported Language**: Make sure the audio is in English, as filler words are currently supported for English audio only.

## Conclusion

By appropriately setting up your API request and ensuring high-quality input audio, you can fully utilize Deepgram's ability to detect and transcribe filler words. If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: <https://discord.gg/deepgram>

## References

- [Deepgram Filler Words Documentation](https://developers.deepgram.com/docs/filler-words)