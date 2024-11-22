# Real-time vs Post-processed Transcription Accuracy

When deciding between real-time transcription and post-processing a full audio file, understanding the differences in accuracy can help you choose the best solution for your needs.

## Accuracy Comparison

Deepgram's transcription services offer different levels of accuracy depending on the method used. 

1. **Pre-recorded Transcription**: This method typically offers higher accuracy because it leverages the entire audio context. Deepgram's benchmarks show a word error rate (WER) of 8.4% for pre-recorded English transcription. 

2. **Real-time Transcription**: In contrast, real-time transcription provides slightly less accuracy compared to pre-recorded because it processes audio as it comes in, without the advantage of overall context. The WER for real-time streaming is approximately 10.7%.

## When to Use Each Method

- **Use Pre-recorded Transcription** if accuracy is your paramount concern and you do not need the results to be instantaneous. Submitting the whole audio for post-process transcription will result in slightly more accurate results due to the availability of the full audio context.

- **Use Real-time Transcription** when you need immediate results, such as in scenarios where live feedback is vital. Although it trades off a bit of accuracy, the ability to get results in real-time can be critical for interactive applications.

## Conclusion

If precision is crucial and time is flexible, opting for post-processed transcription will yield the best accuracy. However, real-time transcription is invaluable for immediate transcription needs, despite a slight trade-off in accuracy.

## References
- [Deepgram Pre-recorded Transcription](https://developers.deepgram.com/docs/getting-started-with-pre-recorded-audio)
- [Deepgram Live Transcription](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio)
- [Deepgram Benchmark Study](https://deepgram.com/learn/nova-2-speech-to-text-api)