# Real-time vs Pre-recorded Transcription Accuracy

When deciding between real-time transcription and pre-recorded audio processing, understanding the differences in accuracy and use cases can help you choose the right approach for your needs.

## Understanding the Difference

Deepgram offers two main approaches to speech-to-text transcription:

1. **Pre-recorded Transcription**: Processes complete audio files after they've been fully recorded
2. **Real-time Transcription**: Processes audio streams as they arrive, providing immediate results

## Accuracy Comparison with Nova-3

According to Deepgram's documentation, Nova-3 represents a significant improvement in accuracy for both methods:

- **Pre-recorded (Batch) Processing**: Nova-3 delivers a 47.4% reduction in word error rate (WER) compared to competitors
- **Real-time (Streaming) Processing**: Nova-3 achieves a 54.2% reduction in WER compared to competitors

While streaming transcription still typically has a slightly higher word error rate than pre-recorded transcription, the gap has narrowed significantly with Nova-3.

## When to Use Each Method

### Pre-recorded Transcription

Best for:
- Maximum accuracy
- Processing archives of audio/video content
- Applications where real-time results aren't required
- Post-production transcription of meetings, interviews, etc.

Pre-recorded transcription can leverage the entire audio context, allowing the model to make more informed decisions about ambiguous speech.

### Real-time Transcription

Best for:
- Live captioning
- Interactive voice applications
- Voice assistants and chatbots
- Real-time meeting transcription
- Customer service applications

Real-time transcription delivers immediate results while maintaining excellent accuracy, making it suitable for interactive applications.

## Implementation Considerations

When implementing either approach, consider:

1. **Model Selection**: The Nova-3 model generally provides the best accuracy for both streaming and pre-recorded transcription
2. **Language Support**: Ensure your chosen model supports all required languages
3. **Features**: Some features like diarization behave differently between pre-recorded and real-time transcription

## Conclusion

Both pre-recorded and real-time transcription approaches with Deepgram's Nova-3 model offer excellent accuracy. Choose pre-recorded transcription when maximum accuracy is paramount and time isn't a constraint. Opt for real-time transcription when immediate results are necessary, with only a minor trade-off in accuracy.

## References
- [Deepgram Pre-recorded Transcription](https://developers.deepgram.com/docs/getting-started-with-pre-recorded-audio)
- [Deepgram Live Transcription](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio)
- [Deepgram Models Overview](https://developers.deepgram.com/docs/models-languages-overview)