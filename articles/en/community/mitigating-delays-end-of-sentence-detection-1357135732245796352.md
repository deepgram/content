# Mitigating Delays in End-of-Sentence Detection with Deepgram Live Transcription API

When using the Deepgram Live Transcription API, users may encounter occasional delays in end-of-sentence detection. This can impact the transcribing process, causing interim results to be repeated or delayed before a final result is presented. Here, we explore steps and configurations to address and mitigate such delays effectively.

## Understanding Configuration Parameters

The key to optimizing transcription performance is adjusting the configuration parameters appropriately. Ensuring values such as `utterance_end_ms` and `endpointing` are set to accommodate the audio content and desired responsiveness.

### Configuration Tips:
- **`utterance_end_ms`**: Consider increasing this value if tighter endpoint detection leads to premature sentence endings or delayed recognition.
- **`endpointing`**: Evaluate whether the endpointing threshold fits the nature of the transcription task (e.g., conversational vs. documentary speech).

## Leveraging Interim Results

Interim results provide non-final transcriptions that help gauge the transcription process in real-time. However, these can become problematic if they're over-relied upon or contribute to perceived delay when `is_final=true` takes significantly longer.

### Strategies for Interim Results:
- Enable `interim_results` selectively, analyzing timing and frequency to determine optimal configuration.
- Rely more on final results to ensure that transcription quality remains high and less susceptible to over-interpretation of interim feedback.

## Analyzing Network and Model Performance

- **Network Conditions**: Latency or bandwidth issues may impact response times. Ensure stable and suitable network performance alongside API usage.
- **Model Characteristics**: Different models like `nova-3` might have varying performance characteristics. Testing alternative models may provide different latency profiles.

## Conclusion and Support

Delays in end-of-sentence detection can disrupt transcription workflows, but careful configuration and performance monitoring can significantly mitigate these issues. For further assistance, exploring Deepgram’s community resources and engaging with their support team can provide additional insights and tailored guidance.

- [Understanding Endpointing and Interim Results](https://developers.deepgram.com/docs/understand-endpointing-interim-results)
- [Deepgram Live Transcription Documentation](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio)

If issues persist or the system behavior seems inconsistent, reach out to your Deepgram support representative (if you have one) or visit our community for assistance: https://discord.gg/deepgram