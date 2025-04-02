# Reducing Latency for Deepgram WebSocket SpeechFinal Events

When using Deepgram's WebSocket API to transcribe microphone audio, latency issues for events like SpeechFinal and EndUtterance can sometimes occur, even when endpointing parameters are configured.

## Solutions to Reduce Latency

To address and reduce the latency you might be experiencing with SpeechFinal and EndUtterance events, consider the following optimizations:

### 1. Adjust Endpointing Parameters
- **Suggestion:** For audio with short utterances or in noisy environments, experiment with an endpointing value less than 1000ms. This could help achieve quicker turnaround for end events.

### 2. Use the `no_delay` Parameter
- **Purpose:** This flag helps in reducing latency, particularly beneficial when paired with `smart_format`.
- **Configuration:** Add `no_delay=true` to your connection options.

### 3. Optimize Utterance End Settings
- **Recommendation:** Ensure `utterance_end_ms` is set to a minimum of 1000ms. It functions optimally with `interim_results=true`, assisting in timely receipt of final events.

### 4. Manual Control Over Endpointing
- **Method:** Set `endpointing=false` and handle endpointing manually using the `Client.Finalize()` function if automatic endpointing does not meet your requirements.

## Further Reading
To gain a thorough understanding of endpointing, interim results, and other related configurations, you may find the following documentation useful:
- [Deepgram Endpointing and Interim Results](https://developers.deepgram.com/docs/understand-endpointing-interim-results)
- [Using No Delay Configuration](https://developers.deepgram.com/docs/smart-format#using-no-delay)

If issues persist or system behavior does not align with expectations, consider reaching out to your Deepgram support representative or visiting our [community platform on Discord](https://discord.gg/deepgram) for assistance.

These strategies and configurations aim to optimize transcription response times, aligning with your specific audio and usage context.